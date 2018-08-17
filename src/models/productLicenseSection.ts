import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productLicenseSectionSchema = new Schema({
    product_id: {
        type: Number,
        required: 'Enter a company name'
    },
    license_section_id: {
        type: Number,
        required: 'Enter a client code'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});