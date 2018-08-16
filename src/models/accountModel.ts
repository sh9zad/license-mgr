import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AccountSchema = new Schema({
    account_name: {
        type: String,
        required: 'Enter a company name'
    },
    client_code: {
        type: String,
        required: 'Enter a client code'
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});