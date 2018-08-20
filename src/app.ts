import * as express from "express";
import * as bodyParser from "body-parser";
import { ProductRoutes } from "./routes/productsRoutes";
import { AccounteRoutes } from "./routes/accountRoutes";

class App {

    public app: express.Application;
    public prodRoutes: ProductRoutes = new ProductRoutes();
    public accountRoutes: AccounteRoutes = new AccounteRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.prodRoutes.routes(this.app);
        this.accountRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;