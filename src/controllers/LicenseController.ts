import * as mongoose from "mongoose";
import {
  AccountSchema,
  LicenseSchema,
  ProductSchema,
  LicenseSectionSchema,
  ProductLicenseSectionSchema
} from "../models";
import { Request, Response } from "express";
import * as BPromise from "bluebird";
import { BaseController } from "./BaseController";

BPromise.promisifyAll(mongoose);
const Account = mongoose.model("Account", AccountSchema);
const License = mongoose.model("License", LicenseSchema);
const Product = mongoose.model("Product", ProductSchema);
const LicenseSection = mongoose.model("LicenseSection", LicenseSectionSchema);
const ProductLicenseSection = mongoose.model(
  "ProductLicenseSection",
  ProductLicenseSectionSchema
);

export class LicenseController extends BaseController {
  public findWithID(req: Request, res: Response) {
    LicenseSection.findById(req.params.id, (err, sections) => {
      if (err) {
        this.returnError(res, err);
      }

      res.send(sections);
    });
  }

  public getDetails(req: Request, res: Response) {
    BPromise.props({
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

  public async addNewSection(req: Request, res: Response) {
    const { productId } = req.params;
    const { sections } = req.body;
    let newSections = [];

    Product.findById(productId)
      .then(() => {
        LicenseSection.insertMany(sections)
          .then(result => {
            newSections = JSON.parse(JSON.stringify(result));

            for (const section of newSections) {
              const prodLice = new ProductLicenseSection({
                product_id: productId,
                license_section_id: section._id
              });

              prodLice.save();
            }

            res.send(newSections);
          })
          .catch(err => {
            console.error(err);
            res.statusCode = 500;
            res.send(err.message);
          });
      })
      .catch(err => {
        console.error(err);
        res.statusCode = 500;
        res.send(err.message);
      });
  }
}
