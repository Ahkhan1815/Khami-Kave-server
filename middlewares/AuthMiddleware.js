const {verify} = require("jsonwebtoken");
const {jwtDecode} =  require("jwt-decode");
const { Users } = require("../models");
require('dotenv').config();

const checkVerification = async (req,res,next) => {
    const accessToken = req.header("accessToken");
    try{
        const validToken = jwtDecode(accessToken);
        const user = await Users.findByPk(validToken.id);
        if (user.verification){
            return next();
        }
        else{
        res.json({error: "Account not verified. Please click the link sent to your email to verify this account."});
        }
    }
    catch (err) {
    return res.json({error: err});
    }
}

    /*
    const accessToken = req.header("accessToken");
    try{
        const validToken = jwtDecode(accessToken);
        if (validToken.verification){
            return next();
        }
        else{
            //res.json(`${validToken.verification}`);
            res.json({error: "Account not verified. Please click the link sent to your email to verify this account."});
        }
    } catch (err) {
        return res.json({error: err});
    }
        */


const validateToken = (req,res,next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "User not logged in"});

    try {
        const validToken = verify(accessToken, process.env.JWT_CODE);
        const username = validToken.username;
        req.user = validToken;

        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }
}


module.exports = {validateToken, checkVerification};