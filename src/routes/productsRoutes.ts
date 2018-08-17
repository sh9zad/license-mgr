import {Request, Response, NextFunction} from "express";
import { ProductController } from "../controllers/productController";

export class Routes { 
    
    public productController: ProductController = new ProductController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/product')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.productController.getProducts)        

        // POST endpoint
        .post(this.productController.addNewProduct);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.productController.getProductWithID)
        .put(this.productController.updateProduct)
        .delete(this.productController.deleteProduct)

    }
}