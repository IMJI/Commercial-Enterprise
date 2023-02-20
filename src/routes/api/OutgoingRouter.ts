import { Router } from "express";
import OutgoingController from "../../controllers/api/OutgoingController";
import Auth from "../../middlewares/Auth";
import ValidationMiddleware from "../../middlewares/Validation";
import OutgoingService from "../../services/OutgoingService";
import { outgoingBodyScheme, outgoingBodyStrictScheme, outgoingQueryScheme } from "../../validation/OutgoingValidation";

const outgoingRouter: Router = Router();

const outgoingValidation = ValidationMiddleware.validate(
    outgoingQueryScheme,
    outgoingBodyScheme,
    outgoingBodyStrictScheme
);

const anyAuth = new Auth();

const outgoingController = new OutgoingController('outgoing');
outgoingRouter
    .route(`/outgoings/:id?`)
    .get(
        outgoingValidation,
        (req, res, next) => { anyAuth.auth(req, res, next); },
        (req, res, next) => { outgoingController.get(req, res, next); }
    )
    .post(
        outgoingValidation,
        (req, res, next) => { anyAuth.auth(req, res, next); },
        (req, res, next) => { outgoingController.post(req, res, next); }
    ).put(
        outgoingValidation,
        (req, res, next) => { anyAuth.auth(req, res, next); },
        (req, res, next) => { outgoingController.put(req, res, next); }
    ).delete(
        outgoingValidation,
        (req, res, next) => { anyAuth.auth(req, res, next); },
        (req, res, next) => { outgoingController.delete(req, res, next); }
    );

export default outgoingRouter;