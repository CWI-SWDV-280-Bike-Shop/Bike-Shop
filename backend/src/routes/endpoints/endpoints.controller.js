import app from '../../../server.js';
import { parse } from 'dotenv';

let hierarchy = {};
let relativePath = '';
const parseLayer = (item, parentPath = null) => {
  if (item.route) {
    relativePath = parentPath + item.route.path;
  } else if (item.method) {
    let method = item.method.toUpperCase();
    let funcName = item.name
      .replace(/([a-z0–9])([A-Z])/g, '$1 $2')
      .toUpperCase();
    let p = hierarchy[parentPath];
    p[method] == null
      ? ((p[method] = {}), (p[method][relativePath] = funcName))
      : (p[method][relativePath] = funcName);
  }

  //Sub items
  if (item.name == 'router' && item.regexp) {
    //Terrible regex to unregex the regex
    let result = item.regexp.toString().match(/(?<=\\\/).*(?=\(\?:)/);
    let parentPath = result ? result : '';
    hierarchy[parentPath] = {};
    if (item.handle.stack) {
      item.handle.stack.forEach((subItem) => {
        parseLayer(subItem, parentPath);
      });
    }
  }
  if (item.route && item.route.stack) {
    item.route.stack.forEach((subItem) => {
      parseLayer(subItem, parentPath);
    });
  }
};

const EndpointController = {
  async getEndpoints(req, res) {
    try {
      app.router.stack
        .filter((layer) => layer.name == 'router')
        .forEach((stackItem) => {
          parseLayer(stackItem);
        });

      //Example of adding manual documentation to a route.
      hierarchy['']['Description'] =
        'Provides information about available endpoints.';

      const endpoints = {
        'API Endpoint Exposition': {
          version: 'v1',
          hierarchy,
        },
      };
      res.status(200).json(endpoints);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default EndpointController;
