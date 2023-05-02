import { plugin } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export const mongoose = plugin(mongooseAutopopulate);
