import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BikeService from '../services/bike.service';


export const retrieveBikes = createAsyncThunk('bikes/retrieve', async () => {
  const res = await BikeService.getAll();
  return res.data;
});

export const retrieveBikeById = createAsyncThunk(
  'bikes/retrieveById',
  async ({ id }) => {
    const res = await BikeService.get(id);
    return res.data;
  }
);

export const createBike = createAsyncThunk(
  'bikes/create',
  async ({
    name,
    description,
    category,
    color,
    size,
    gender,
    price,
    inStock,
  }) => {
    const res = await BikeService.create({
      name,
      description,
      category,
      color,
      size,
      gender,
      price,
      inStock,
    });
    return res.data;
  }
);

export const updateBike = createAsyncThunk('bikes/update', async (id, data) => {
  const res = await BikeService.update(id, data);
  return res.data;
});

export const deleteBike = createAsyncThunk('bikes/delete', async (id) => {
  const res = await BikeService.delete(id);
  return res.data;
});

export const findBikesByName = createAsyncThunk(
  'bikes/findByName',
  async (name) => {
    const res = await BikeService.findByName(name);
    return res.data;
  }
);

export const findBikesByCategory = createAsyncThunk(
  'bikes/findByCategory',
  async (category) => {
    const res = await BikeService.findByCategory(category);
    return res.data;
  }
);

export const findBikesByInStock = createAsyncThunk(
  'bikes/findByInStock',
  async (inStock) => {
    const res = await BikeService.findByInStock(inStock);
    return res.data;
  }
);

export const findBikesByColor = createAsyncThunk(
  'bikes/findByColor',
  async (color) => {
    const res = await BikeService.findByColor(color);
    return res.data;
  }
);

export const findBikesBySize = createAsyncThunk(
  'bikes/findBySize',
  async (size) => {
    const res = await BikeService.findBySize(size);
    return res.data;
  }
);

export const findBikesByGender = createAsyncThunk(
  'bikes/findByGender',
  async (gender) => {
    const res = await BikeService.findByGender(gender);
    return res.data;
  }
);

const initialState = [];

const BikeSlice = createSlice({
  name: 'bikes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(retrieveBikes.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(retrieveBikeById.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(createBike.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateBike.fulfilled, (state, action) => {
        const index = state.findIndex((bike) => bike.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteBike.fulfilled, (state, action) => {
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      })
      .addCase(findBikesByName.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findBikesByCategory.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findBikesByInStock.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findBikesByColor.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findBikesBySize.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(findBikesByGender.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

const { reducer } = BikeSlice;
export default reducer;
