import { Request, Response, NextFunction } from "express";
import { AccountController } from "../controllers";

export class AccountRoutes {
  public controller: AccountController = new AccountController();

  public routes(app): void {
    app
      .route("/account")
      .get((req: Request, res: Response, next: NextFunction) => {
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

    app.route("/account/details/:id").get(this.controller.getDetails);
  }
}
