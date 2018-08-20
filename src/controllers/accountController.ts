import * as mongoose from 'mongoose';
import { AccountSchema } from '../models/accountModel';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';
mongoose.connect('mongodb://localhost:27017/myapp');


const Model = mongoose.model('Account', AccountSchema);

export class AccountController extends BaseController {
    constructor() {
        super(Model);
    }
}