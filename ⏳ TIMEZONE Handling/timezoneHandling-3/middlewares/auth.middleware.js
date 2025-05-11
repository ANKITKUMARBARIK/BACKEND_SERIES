import { validateToken } from "../services/auth.service.js";

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return next();
    const payloadUser = validateToken(token);
    if (!payloadUser) return res.redirect("/signin");
    req.user = payloadUser;

    return next();
}

export default checkForAuthentication;
