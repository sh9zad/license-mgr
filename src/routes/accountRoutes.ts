import { Request, Response, NextFunction } from "express";
import { AccountController } from "../controllers/accountController";

export class AccountRoutes {
  public controller: AccountController = new AccountController();

  public routes(app): void {
    app
      .route("/account")
      .get((req: Request, res: Response, next: NextFunction) => {
        // middleware
        // console.log(`Request from: ${req.originalUrl}`);
        // console.log(`Request type: ${req.method}`);
        // if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
        //     res.status(401).send('You shall not pass!');
        // } else {
        //     next();
        // }
        next();
      }, this.controller.get)

      // POST endpoint
      .post(this.controller.addNew);

    // Contact detail
    app
      .route("/account/:id")
      .get(this.controller.getWithID)
      .put(this.controller.update)
      .delete(this.controller.delete);
  }
}
