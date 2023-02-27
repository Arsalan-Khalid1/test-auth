import { Response, Request, NextFunction } from "express";
import { loginUserValidationSchema } from "../validations/userValidationSchema";

export const loginUserSchemaValidation = async (req: Request, res: Response, next: NextFunction) => {
    const value = await loginUserValidationSchema.validateAsync(req.body)
    if(value)
    {
        next()
    }
}