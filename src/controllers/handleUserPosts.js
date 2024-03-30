import { getUser } from "../models/getDataForProfile.js";
import { getMyPosts, getPosts, insertUserPost } from "../models/handleUserPosts.js";

const makePost = async (req,res) => {
    
    if(req.isAuthenticated()) {
        try {
            const {caption} = req.body;
            const imageMediaUrl = req.file?req.file.filename:null;
            await insertUserPost(req.user.username,caption,imageMediaUrl);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login");
    }
}

const renderUserPosts = async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
           const response = await getPosts();
           return res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login");
    }
}

const getProfileSummary = async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
           const response = await getUser(req.user.username);
           return res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login");
    }
}

const myPosts = async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
            const result = await getMyPosts(req.user.username);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login");
    }
}

export {makePost, renderUserPosts, getProfileSummary, myPosts};