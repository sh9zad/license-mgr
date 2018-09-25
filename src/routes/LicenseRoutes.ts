import { LicenseController } from "../controllers";

export class LicenseRoutes {
  public controller: LicenseController = new LicenseController();

  public routes(app): void {
    app.route("/license/:id").get(this.controller.findWithID);

    app
      .route("/license/detail/:module*?/:id*?")
      .get(this.controller.getDetails);

    app
      .route("/license/section/:productId")
      .get(this.controller.getSections)
      .put(this.controller.updateSection)
      .post(this.controller.addNewSection);
  }
}
