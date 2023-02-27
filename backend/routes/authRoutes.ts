import express from "express"
import { registerUser, login, resetPassword, loggedOutUser }  from  "../controllers/authController"
import myAsyncHandler from "../asyncHandler";
import { loginUserSchemaValidation } from "../middleware/validationMiddleware";
const router = express.Router()


router.post("/login", login)
router.post("/register", registerUser)
router.post("/reset-password", resetPassword)
module.exports = router;
