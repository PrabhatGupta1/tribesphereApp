import { db } from "../config/db.js";
import { addNewPassion } from "../models/addNewPassion.js";

const editProfile = async(req,res)=> {
    if(req.isAuthenticated()) {
        try {
            const {fullname,bio,mobile_no} = req.body;
            await db.query(
                "UPDATE users SET fullname = $1, bio = $2, mobile_no = $3 WHERE username = $4",
                [fullname,bio,mobile_no,req.user.username]
            )
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error editing your profile");
        }
    } else {
        res.redirect("/login");
    }
};

const addNewHobbyOrInterest =  async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
            console.log(req.body);
            const {passion,new_passion,description} = req.body;
            const username = req.user.username;
            addNewPassion(username,passion,new_passion,description);
            res.redirect("/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.redirect("/login");
    }
};

const addUserGoals = async (req,res)=> {
    if (req.isAuthenticated()) {
        try {
            const {new_goal,description} = req.body;
            await db.query(
                "INSERT INTO user_goals (username,goal_title,goal_description) VALUES ($1,$2,$3)",
                [req.user.username,new_goal,description]
            );
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error.");
        }
    } else {
        res.redirect("/login");
    }
};

const changeProfilePicture = async function (req, res) {
    
    if(req.isAuthenticated()) {
        try {
            await db.query(
                "UPDATE users SET profile_pic_url = $1 WHERE username = $2",
                [req.file.filename,req.user.username]
            );
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    else {
        res.redirect("/login");
    }
};

const changeProfileCover = async function (req, res) {
    
    if(req.isAuthenticated()) {
        try {
            await db.query(
                "UPDATE users SET profile_cover_url = $1 WHERE username = $2",
                [req.file.filename,req.user.username]
            );
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    else {
        res.redirect("/login");
    }
};

export {editProfile, addNewHobbyOrInterest, addUserGoals, changeProfileCover, changeProfilePicture};