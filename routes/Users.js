const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { checkVerification } = require("../middlewares/AuthMiddleware");



router.post("/", async (req, res) => {
    const { username, password, email } = req.body;

    const existingUser = await Users.findOne({
        where: {
            [Op.or]: [{ username: username }, { email: email }],
        },
    });

    if (existingUser) {
        if (existingUser.username === username) {
            return res.json({ error: "Username already in use" });
        }
        if (existingUser.email === email) {
            return res.json({ error: "Email already in use" });
        }
    }

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: process.env.USER_NAME,
            pass: process.env.APP_PASSWORD,
        }
    });

    const verificationToken = crypto.randomBytes(32).toString('hex');


    const mailInfo = {
        from: {
            name: "No-Reply-Khami's-Kave",
            address: process.env.USER_NAME,
        },
        to: email,
        subject: "Verify your Khami's Kave Account",
        text: `Click on the following link to verify your account: https://khami-kave-server.onrender.com/auth/verification/${verificationToken}`
    }
    bcrypt.hash(password, 15).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email,
            verification: false,
            verificationToken: verificationToken,
            isAdmin: false,

        })
        transport.sendMail(mailInfo,(error) => {
            if(error){
                return res.json({error: "Failed to send verification email"});
            }
            else{
                res.json("User added");
            }
        });
    })
});

router.get('/verification/:verificationToken', async (req,res) =>{
    const {verificationToken} = req.params;
    const user = await Users.findOne({where: {verificationToken: verificationToken}});
    if (user){
        user.verification= true;
        user.verificationToken = null;
        await user.save();
        return res.json("Successfully verified user");
    }
    else{
        return res.json({error: "Invalid verification token"});
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) return res.json({ error: "User Not Found" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username or Password" });
        else {
            const accessToken = jwt.sign({ username: user.username, id: user.id, verification: user.verification , isAdmin: user.isAdmin}, "xvVOShLivM");
            res.json(accessToken);
        }
    });
})


module.exports = router;