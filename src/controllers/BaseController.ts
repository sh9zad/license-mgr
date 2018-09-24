import { Response } from "express";

export class BaseController {
    public returnError(res: Response, err: Error) {
        res.statusCode = 500;
        res.send(err.message);
    }
}