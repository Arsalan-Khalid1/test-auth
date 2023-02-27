import  { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import dbErrorHandler from "../utils/dbErrorHandler"

const errorHandler: ErrorRequestHandler  = (err : any ,req : Request, res : Response, next :NextFunction) => {
    const statusCode: number = res.statusCode ? res.statusCode : 500
    if (err.message) {
        
        return res.status(500).json({ message : err})
    }
}

export default errorHandler