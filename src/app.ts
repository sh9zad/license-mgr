import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cookieParser from "cookie-parser";
import { AccountRoutes, LicenseRoutes, ProductRoutes } from "./routes";

class App {
  public app: express.Application;
  public productRoutes: ProductRoutes = new ProductRoutes();
  public accountRoutes: AccountRoutes = new AccountRoutes();
  public licenseRoutes: LicenseRoutes = new LicenseRoutes();
  public mongoUrl: string = "mongodb://localhost:27017/license_mgr";

  constructor() {
    this.app = express();
    this.config();
    this.productRoutes.routes(this.app);
    this.accountRoutes.routes(this.app);
    this.licenseRoutes.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTION");
      res.header("Access-Control-Allow-Headers", "Content-Type");

      next();
    });

    // serving static files
    this.app.use(express.static("public"));
  }

  private mongoSetup(): void {
    //mongoose.Promise = Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
