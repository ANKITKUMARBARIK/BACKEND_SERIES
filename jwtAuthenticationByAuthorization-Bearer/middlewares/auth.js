const { getUser } = require("../service/auth.js")

async function restrictUserOnly(req, res, next) {
    // ab jabhi bhi user kuch request krega toh server wo requests se headers ko read krega usme se 'Bearer' word hata dega aur jwt token verify kr lega..
    const userUid = req.headers["authorization"]  // look like - "Bearer 2hut45yu3"
    if (!userUid) return res.redirect("/login")
    const token = userUid.split(" ")[1]  // look like ['Bearer', '2hut45yu3'] ...ab array se hume token chahiye islie hum index 1 use kie [1].
    const user = getUser(token)  // server verify kr lega jwt token
    if (!user) return res.redirect("/login")
    req.user = user

    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.headers["authorization"]
    if (!userUid) {
        req.user = null
        return next(); // Let it pass but without user
    }
    const token = userUid.split(" ")[1]
    const user = getUser(token)
    req.user = user

    next();
}

module.exports = {
    restrictUserOnly,
    checkAuth,
};