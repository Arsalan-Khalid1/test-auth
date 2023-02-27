import { Request, Response, NextFunction } from 'express';

export default (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  console.log("here i am")
  Promise.resolve(fn(req, res, next)).catch(next);
};
