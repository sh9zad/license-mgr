import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LicenseSchema = new Schema({
    account_id: {
        type: String,
        required: 'Enter a company name'
    },
    product_id: {
        type: String,
        required: 'Enter a client code'
    },
    license: {
        type: String,
        required: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});