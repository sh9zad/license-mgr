import * as mongoose from "mongoose";
import {
  ProductSchema,
  ProductLicenseSectionSchema,
  LicenseSectionSchema
} from "../models";
import { Request, Response } from "express";
import { BaseController } from "./BaseController";

const Product = mongoose.model("Product", ProductSchema);
const ProductLicenseSection = mongoose.model(
  "ProductLicenseSection",
  ProductLicenseSectionSchema
);
const LicenseSection = mongoose.model("LicenseSection", LicenseSectionSchema);

export class ProductController extends BaseController {
  public addNew(req: Request, res: Response) {
    let newItem = new Product(req.body);

    newItem.save((err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public get(req: Request, res: Response) {
    Product.find({}, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public getWithID(req: Request, res: Response) {
    Product.findById(req.params.id, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public update(req: Request, res: Response) {
    Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, item) => {
        if (err) {
          res.send(err);
        }
        res.json(item);
      }
    );
  }

  public delete(req: Request, res: Response) {
    Product.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted the item!" });
    });
  }

  public getDetails(req: Request, res: Response) {
    const { productId } = req.params;

    Product.findById(productId, (err, product) => {
      if (err) {
        BaseController.returnError(res, err);
      }

      ProductLicenseSection.find(
        { product_id: productId },
        (err, productSections) => {
          if (err) {
            BaseController.returnError(res, err);
          }

          LicenseSection.find({}, (err, licenseSections) => {
            if (err) {
              BaseController.returnError(res, err);
            }

            res.send({ product, productSections, licenseSections });
          });
        }
      );
    });
  }
}
