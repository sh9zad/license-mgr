import * as mongoose from 'mongoose';
import { ProductSchema } from '../models/productModel';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';
mongoose.connect('mongodb://localhost:27017/myapp');


const Product = mongoose.model('Product', ProductSchema);

export class ProductController extends BaseController {

    constructor() {
        super(Product);
    }

    public addNewProduct(req: Request, res: Response) {
        super.addNewItem(Product, req, res);
    }
}