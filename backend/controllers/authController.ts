import { Request, Response, NextFunction, RequestHandler } from "express";
import myAsyncHandler from "../asyncHandler";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken";
import dbErrorHandler from "../utils/dbErrorHandler";

// Register a new User
export const registerUser: RequestHandler =
  async (req: Request, res: Response) => {
    try {
      let { firstName, lastName, email, password, passwordConfirmation } = req.body;
      if(password === passwordConfirmation)
      {
        let registeredUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      if (registeredUser) {
        return res.status(201).json({ user: registerUser });
      }
      else
      {
        return res.status(400).json({errors: [{message: "passwords do not match"}]})
      }
      }
    } catch (error: any) {
        const {message, code} = dbErrorHandler(error)
      res.status(code).json({errors: [{message: message}]})
    }
  }


// Verifying to login the Existing User
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (password) {
        let accessToken: String | undefined = createToken(
          user._id.toString(),
          "mySecretKey"
        );
        res.cookie("jwt", accessToken, {
          expires: new Date(Date.now() + 600000),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res
          .status(200)
          .json({
            accessToken,
            message:
              user.firstName + " " + user.lastName + " Logged In Successfully",
          });
      }
      else
      {
        return res.status(401).json({errors: [{message: "passwords do not match"}]})
      }
    } else {
      return res.status(404).json({ errors: [{ message: "user not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

//Reset Password for the User
export const resetPassword: RequestHandler = myAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { password, passwordConfirmation, firstName, lastName } = req.body;
      const user = await User.findOne({firstName, lastName})
      if(!user)
      {
        return res.status(404).json({errors: [{message: "User not found"}]})
      }
      else
      {
        if(password !== passwordConfirmation)
        {
            return res.status(400).json({errors: [{message: "passwords do not match"}]})
        }
        else
        {
            user.password === password
            const updatedUser = await user.save()
            if(updatedUser)
            return res
              .status(200)
              .json({
                message: "Password Changed Successfully",
                user: updatedUser,
              });
        }
      }
    } catch (error) {
      const {message, code} = dbErrorHandler(error)
      res.status(code).json({errors: [{message: message}]})
    }
  }
);

// Logout the current User
export const loggedOutUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User Logged Out Successfully." });
  } catch (error) {
    next(error);
  }
};

// Create a unique token if login or register
export const createToken = (_id: String, sk: Secret) => {
  return jwt.sign({ _id }, sk);
};
