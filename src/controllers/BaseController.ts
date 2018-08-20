import * as mongoose from "mongoose";
import { Request, Response } from 'express';


mongoose.connect('mongodb://localhost:27017/license-mgr');

export class BaseController {
    model: mongoose.Model<mongoose.Document>;

    constructor(model: mongoose.Model<mongoose.Document>) {
        this.model = model;

        console.log("", this.model);
    }

    public addNewItem(model: mongoose.Model<mongoose.Document>, req: Request, res: Response) {
        let newItem = new this.model(req.body);

        newItem.save((err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    }

    public getItems(req: Request, res: Response) {
        this.model.find({}, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    }

    public getItemWithID(req: Request, res: Response) {
        this.model.findById(req.params.itemId, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    }

    public updateItem(req: Request, res: Response) {
        this.model.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true }, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    }

    public deleteItem(req: Request, res: Response) {
        this.model.remove({ _id: req.params.itemId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
}
