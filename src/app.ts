import * as express from "express";
import * as bodyParser from "body-parser";
import { ProductRoutes } from "./routes/productsRoutes";
import { AccountRoutes } from "./routes/accountRoutes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public productRoutes: ProductRoutes = new ProductRoutes();
    public accountRoutes: AccountRoutes = new AccountRoutes();
    public mongoUrl: string = 'mongodb://localhost:27017/license_mgr';

    constructor() {
        this.app = express();
        this.config();        
        this.productRoutes.routes(this.app);     
        this.accountRoutes.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);        
    }

}

export default new App().app;