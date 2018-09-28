import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ProductLicenseSectionSchema = new Schema({
  license_id: {
    type: String,
    required: "Enter a company name"
  },
  license_section_id: {
    type: String,
    required: "Enter a client code"
  },
  section_value: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
