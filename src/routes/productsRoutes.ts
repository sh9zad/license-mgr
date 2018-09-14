import { Request, Response, NextFunction } from "express";
import { ProductController } from "../controllers/productController";

export class ProductRoutes {
  public controller: ProductController = new ProductController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });

    // Contact
    app
      .route("/product")
      .get((req: Request, res: Response, next: NextFunction) => {
        next();
      }, this.controller.get)

      // POST endpoint
      .post(this.controller.addNew);

    // Contact detail
    app
      .route("/product/:id")
      .get(this.controller.getWithID)
      .put(this.controller.update)
      .delete(this.controller.delete);
  }
}
