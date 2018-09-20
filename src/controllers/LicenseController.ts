import * as mongoose from "mongoose";
import {
  AccountSchema,
  LicenseSchema,
  ProductSchema,
  LicenseSectionSchema,
  ProductLicenseSectionSchema
} from "../models";
import { Request, Response } from "express";
import * as Promise from "bluebird";

Promise.promisifyAll(mongoose);
const Account = mongoose.model("Account", AccountSchema);
const License = mongoose.model("License", LicenseSchema);
const Product = mongoose.model("Product", ProductSchema);
const LicenseSection = mongoose.model("LicenseSection", LicenseSectionSchema);
const ProductLicenseSection = mongoose.model(
  "ProductLicenseSection",
  ProductLicenseSectionSchema
);

export class LicenseController {
  public addNew(req: Request, res: Response) {
    let newItem = new Account(req.body);

    newItem.save((err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public get(req: Request, res: Response) {
    Account.find({}, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public getWithID(req: Request, res: Response) {
    Account.findById(req.params.id, (err, item) => {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  }

  public update(req: Request, res: Response) {
    Account.findOneAndUpdate(
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
    Account.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted the item!" });
    });
  }

  public getDetails(req: Request, res: Response) {
    Promise.props({
      products:
        req.params.module && req.params.module !== "account"
          ? []
          : Product.find({}),
      accounts:
        req.params.module && req.params.module !== "product"
          ? []
          : Account.find({})
    })
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        res.send(err);
      });
  }

  public getSections(req: Request, res: Response) {
    const { productId } = req.params;

    ProductLicenseSection.find(
      { product_id: productId },
      (err, productLicenses) => {
        if (err) {
          res.send(err);
        }

        const sectionIDs = productLicenses.map(
          pl => pl.toObject().license_section_id
        );

        LicenseSection.find(
          { _id: { $in: sectionIDs } },
          (err, licenseSections) => {
            if (err) {
              res.send(err);
            }

            res.send({ productLicenses, licenseSections });
          }
        );
      }
    );
  }
}
