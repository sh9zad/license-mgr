import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myapp');

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