import { Request, Response, NextFunction } from "express";
import { LicenseController } from "../controllers";

export class LicenseRoutes {
  public controller: LicenseController = new LicenseController();

  public routes(app): void {
    app
      .route("/license/:module?/:id?")
      .get(this.controller.get)
      .post(this.controller.addNew);
  }
}
