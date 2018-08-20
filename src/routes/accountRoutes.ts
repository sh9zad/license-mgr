import { Request, Response, NextFunction } from "express";
import { AccountController } from "../controllers/accountController";
import { BaseRoutes } from "./BaseRoutes";


export class AccounteRoutes extends BaseRoutes {

    constructor() {
        super(new AccountController(), 'account');
    }

}