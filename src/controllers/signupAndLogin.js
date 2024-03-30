import passport from "../config/passportConfig.js";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";

const registerUser = async (req,res)=> {
    const {email,fullname,username,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.query(
            "INSERT INTO users (username,fullname,email,password) values ($1,$2,$3,$4)",
            [username,fullname,email,hashedPassword]
        );
        passport.authenticate("local")(req,res,function(){
            res.redirect("/profile");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Occured while signing up");
    }
};

const authenticateUser = passport.authenticate('local', {
    failureRedirect: '/login'
});

const loginUser = async (req,res)=> {
    res.redirect("/profile");
};

const logoutUser = (req,res,next)=> {
    req.logout(function(err){
        if(err) {
            next(err);
        }
    });
    res.redirect("/login");
};

export {registerUser, authenticateUser, loginUser, logoutUser};