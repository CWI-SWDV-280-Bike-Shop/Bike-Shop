import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ServiceService from '../services/services.service';


export const retrieveService = createAsyncThunk('service/retrieve', async () => {
  const res = await ServiceService.getAll();
  return res.data;
});

export const retrieveServiceById = createAsyncThunk(
  'service/retrieveServiceById',
  async ({ id }) => {
    const res = await ServiceService.get(id);
    return res.data;
  }
);

export const createService = createAsyncThunk(
  'service/create',
  async ({
    name,
    description,
    category,
    price,
    image,
    inStock,
  }) => {
    const res = await ServiceService.create({
      name,
      description,
      category,
      price,
      image,
      inStock,
    });
    return res.data;
  }
);

export const updateService = createAsyncThunk('service/update', async (id, data) => {
  const res = await ServiceService.update(id, data);
  return res.data;
});

export const deleteService = createAsyncThunk('service/delete', async (id) => {
  const res = await ServiceService.delete(id);
  return res.data;
});

export const findServiceByName = createAsyncThunk(
  'service/findByName',
  async (name) => {
    const res = await ServiceService.findByName(name);
    return res.data;
  }
);

export const findServiceByCategory = createAsyncThunk(
  'service/findByCategory',
  async (category) => {
    const res = await ServiceService.findByCategory(category);
    return res.data;
  }
);


export const findServiceByPrice = createAsyncThunk(
  'service/findByPrice',
  async (price) => {
    const res = await ServiceService.findByPrice(price);
    return res.data;
  }
);

export const findServiceByInStock = createAsyncThunk(
  'service/findByInStock',
  async (inStock) => {
    const res = await ServiceService.findByInStock(inStock);
    return res.data;
  }
);
/*
export const findServiceByImage = createAsyncThunk(
  'service/findByImage',
  async (image) => {
    const res = await ServiceService.findByImage(image);
    return res.data;
  }
);

export const findServiceByTimeStamp = createAsyncThunk(
  'service/findByTimeStamp',
  async (timestamps) => {
    const res = await ServiceService.findByTimeStamp(timestamps);
    return res.data;
  }
);*/

const initialState = [];

const ServiceSlice = createSlice({

})


const ServicesSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(retrieveServices.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(retrieveServiceById.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.findIndex((bike) => bike.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      })
      .addCase(findServiceByName.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findServiceByCategory.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findServiceByInStock.fulfilled, (state, action) => {
        return [...action.payload];
      })
/*
      .addCase(findServiceByImage.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findServiceByTimeStamp.fulfilled, (state, action) => {
        return [...action.payload];
      })
*/
  },
});

const { reducer } = ServicesSlice;
export default reducer;
