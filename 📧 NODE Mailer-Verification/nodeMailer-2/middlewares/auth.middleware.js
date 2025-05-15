import { validateToken } from "../services/auth.service.js";

function checkForValidation(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return next();
    const userPayload = validateToken(token);
    if (!userPayload) return res.redirect("/signin");

    req.user = userPayload;

    return next();
}

export default checkForValidation;
