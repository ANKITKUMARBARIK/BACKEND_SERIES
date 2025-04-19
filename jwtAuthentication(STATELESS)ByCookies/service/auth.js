const jwt = require("jsonwebtoken")
const secret = "admin$123@$"


// first jab client login karega toh server ek [token with secretkey] lagake data bhejega client ko ...
function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret)
}

// fhir kabhi bhi client request krega like /profile,.., toh request ke sath wo secretkey bhi jaega server ke pass...fhir server wo secretkey ko verify krke data bhejega client ko
function getUser(token) {
    try{
        return jwt.verify(token,secret)
    }catch(error){
        return null
    }
}

module.exports = {
    setUser,
    getUser
}