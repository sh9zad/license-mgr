import { LicenseController } from "../controllers";

export class LicenseRoutes {
  public controller: LicenseController = new LicenseController();

  public routes(app): void {
    app
      .route("/license/:module*?/:id*?")
      .get(this.controller.getDetails)
      .post(this.controller.addNew);

    app.route("/license/section/:productId").get(this.controller.getSections);
  }
}
