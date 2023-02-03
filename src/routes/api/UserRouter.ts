import { Router } from "express";
import UserController from "../../controllers/UserController";
import ValidationMiddleware from "../../middlewares/Validation";
import UserService from "../../services/UserService";
import { userBodySchema, userBodyStrictSchema, userQuerySchema } from "../../validation/UserValidator";

const userRouter = Router();
const userValidation = ValidationMiddleware.validate(
    userQuerySchema,
    userBodySchema,
    userBodyStrictSchema
);

const userController = new UserController('user', UserService);
userRouter
    .route('/users/:id?')
    .get(userValidation, (req, res, next) =>
        userController.get(req, res, next)
    )
    .post(userValidation, (req, res, next) =>
        userController.post(req, res, next)
    );

export default userRouter;