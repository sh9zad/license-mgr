import { Request, Response, NextFunction } from "express";
import { ProductController } from "../controllers/productController";
import { BaseRoutes } from "./BaseRoutes";


export class ProductRoutes extends BaseRoutes {

    constructor() {
        super(new ProductController(), 'product');
    }
}