import { Request, Response, NextFunction } from "express";
import { ProductController } from "../controllers";

export class ProductRoutes {
  public controller: ProductController = new ProductController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });
    app
      .route("/product")
      .get((req: Request, res: Response, next: NextFunction) => {
        next();
      }, this.controller.get)
      .post(this.controller.addNew);

    app
      .route("/product/:id")
      .get(this.controller.getWithID)
      .put(this.controller.update)
      .delete(this.controller.delete);

    app.route("/product/details/:productId").get(this.controller.getDetails);
  }
}
