import * as mongoose from "mongoose";
import { Request, Response } from "express";
import {
  AccountSchema,
  LicenseSchema,
  ProductLicenseSectionSchema,
  LicenseLicenseSectionSchema,
  LicenseSectionSchema,
  ProductSchema
} from "../models";

const Account = mongoose.model("Account", AccountSchema);
const Product = mongoose.model("Product", ProductSchema);
const License = mongoose.model("License", LicenseSchema);
const LicenseSection = mongoose.model("LicenseSection", LicenseSectionSchema);
const LicenseSectionRelate = mongoose.model(
  "LicenseLicenseSection",
  LicenseLicenseSectionSchema
);
const ProductLicense = mongoose.model(
  "ProductLicense",
  ProductLicenseSectionSchema
);

export class AccountController {
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
    Account.findById(req.params.id, (err, account) => {
      if (err) {
        res.statusCode = 500;
        res.send(err.message);
      }

      License.find({ account_id: req.params.id })
        .lean()
        .exec((err, licenses) => {
          if (err) {
            res.statusCode = 500;
            res.send(err.message);
          }

          const licenseIds: string[] = licenses.map(license => {
            return license._id;
          });

          console.log(licenseIds);

          LicenseSectionRelate.find({ license_id: { $in: licenseIds } })
            .lean()
            .exec((err, sections) => {
              if (err) {
                res.statusCode = 500;
                res.send(err.message);
              }
              const sectionIds = sections.map(section => {
                return section.license_section_id;
              });

              LicenseSection.find(
                { _id: { $in: sectionIds } },
                (err, licSection) => {
                  if (err) {
                    res.statusCode = 500;
                    res.send(err.message);
                  }

                  res.send({ account, licenses, sections, licSection });
                }
              );
            });
        });
    });
  }

  public generateLicense(req: Request, res: Response) {
    const licenseValues = {
      account_id: req.params.accountId,
      product_id: req.params.productId,
      license: req.params.productId + " " + req.params.accountId
    };

    const sections: string[] = req.body;

    const newLicense = new License(licenseValues);
    newLicense.save((err, license) => {
      if (err) {
        res.statusCode = 500;
        res.send(err.message);
      }

      const licenseSections = sections.map(section => {
        return {
          license_id: license._id,
          license_section_id: section,
          section_value: ""
        };
      });

      LicenseSectionRelate.insertMany(
        licenseSections,
        { ordered: false },
        (err, lisSecs) => {
          if (err) {
            res.statusCode = 500;
            res.send(err.message);
          }

          if (lisSecs) {
            res.send(JSON.stringify("success"));
          } else {
            res.send(JSON.stringify("error"));
          }
        }
      );
    });
  }
}
