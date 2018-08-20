import { Request, Response, NextFunction } from "express";
import { BaseController } from "controllers/BaseController"


export class BaseRoutes {

    protected controller: BaseController;
    protected endpoint: string;

    constructor(controller: BaseController, endpoint: string) {
        this.controller = controller;
        this.endpoint = endpoint;
    }

    public routes(app): void {
        // Contact 
        app.route(`/${this.endpoint}`)
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                //console.log(res);
                // if (req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
                //     res.status(401).send('You shall not pass!');
                // } else {
                //     next();
                // }
                next();
            }, this.controller.getItems)

            // POST endpoint
            .post(this.controller.addNewItem);

        // Contact detail
        app.route(`/${this.endpoint}/:itemId`)
            // get specific contact
            .get(this.controller.getItemWithID)
            .put(this.controller.updateItem)
            .delete(this.controller.deleteItem)

    }
}