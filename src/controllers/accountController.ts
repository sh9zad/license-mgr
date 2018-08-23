import * as mongoose from 'mongoose';
import { AccountSchema } from '../models/accountModel';
import { Request, Response } from 'express';

const Account = mongoose.model('Account', AccountSchema);

export class AccountController{

    public addNew (req: Request, res: Response) {                
        let newItem = new Account(req.body);
    
        newItem.save((err, item) => {
            if(err){
                res.send(err);
            }    
            res.json(item);
        });
    }

    public get (req: Request, res: Response) {           
        Account.find({}, (err, item) => {
            if(err){
                res.send(err);
            }
            res.json(item);
        });
    }

    public getWithID (req: Request, res: Response) {           
        Account.findById(req.params.contactId, (err, item) => {
            if(err){
                res.send(err);
            }
            res.json(item);
        });
    }

    public update (req: Request, res: Response) {           
        Account.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, item) => {
            if(err){
                res.send(err);
            }
            res.json(item);
        });
    }

    public delete (req: Request, res: Response) {           
        Account.remove({ _id: req.params.id }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted the item!'});
        });
    }
}