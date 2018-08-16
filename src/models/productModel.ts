import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a company name'
    },
    code: {
        type: String,
    },
    salt: {
        type: String,
        required: 'Enter a client code'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});