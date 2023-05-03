import mongoose from 'mongoose';
const { Schema } = mongoose;

export const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});
