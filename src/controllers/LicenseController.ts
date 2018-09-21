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
    console.log(productId);

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

  public addNewSection(req: Request, res: Response) {
    const { productId } = req.params;
    try {
      Product.find({ _id: productId }, (err, product) => {
        if (err) {
          res.statusCode = 400;
          res.send(err.message);
        } else {
          res.send("Done");
        }
      });
    } catch (err) {
      console.log("jkdfjkdkjdfjk");
      res.send(err);
    }
  }
}
