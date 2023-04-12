import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AccessoryService from '../services/accessory.service';


export const retrieveAccessories = createAsyncThunk('accessories/retrieve', async () => {
  const res = await AccessoryService.getAll();
  return res.data;
});

export const retrieveAccessoriesById = createAsyncThunk(
  'accessories/retrieveById',
  async ({ id }) => {
    const res = await AccessoryService.get(id);
    return res.data;
  }
);

export const createAccessories = createAsyncThunk(
  'Accessories/create',
  async ({
    name,
    description,
    category,
    price,
    inStock,
  }) => {
    const res = await createAccessories.create({
      name,
      description,
      category,
      price,
      inStock,
    });
    return res.data;
  }
);

export const updateAccessory = createAsyncThunk('Accessories/update', async (id, data) => {
  const res = await AccessoryService.update(id, data);
  return res.data;
});

export const deleteAccessory = createAsyncThunk('bikes/delete', async (id) => {
  const res = await AccessoryService.delete(id);
  return res.data;
});

export const findAccessoriesByName = createAsyncThunk(
  'Accessories/findByName',
  async (name) => {
    const res = await AccessoryService.findByName(name);
    return res.data;
  }
);

export const findAccessoriesByCategory = createAsyncThunk(
  'Accessories/findByCategory',
  async (category) => {
    const res = await AccessoryService.findByCategory(category);
    return res.data;
  }
);

export const findAccessoriesByInStock = createAsyncThunk(
  'Accessories/findAccessoriesByInStock',
  async (inStock) => {
    const res = await AccessoryService.findAccessoriesByInStock(inStock);
    return res.data;
  }
);

const initialState = [];

const AccessorySlice = createSlice({
  name: 'accessories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(retrieveAccessories.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(retrieveAccessoriesById.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(createAccessories.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateAccessory.fulfilled, (state, action) => {
        const index = state.findIndex((accessory) => accessory.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteAccessory.fulfilled, (state, action) => {
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      })
      .addCase(findAccessoriesByName.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findAccessoriesByCategory.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findAccessoriesByInStock.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

const { reducer } = AccessorySlice;
export default reducer;
