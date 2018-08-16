import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LicenseSectionSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a company name'
    },
    type: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});