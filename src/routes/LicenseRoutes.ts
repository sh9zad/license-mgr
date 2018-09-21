import { LicenseController } from "../controllers";

export class LicenseRoutes {
  public controller: LicenseController = new LicenseController();

  public routes(app): void {
    app
      .route("/license/detail/:module*?/:id*?")
      .get(this.controller.getDetails);

    app
      .route("/license/section/:productId")
      .get(this.controller.getSections)
      .post(this.controller.addNewSection);
  }
}
