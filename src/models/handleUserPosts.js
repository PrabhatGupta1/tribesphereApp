import {db} from "../config/db.js";

async function insertUserPost(username, caption, imageMediaUrl) {
    try {
        const response = await db.query(
            "INSERT INTO user_post (username, caption, image_media_url) VALUES ($1,$2,$3)",
            [username,caption,imageMediaUrl]
        );
    } catch (error) {
        console.log(error);
    }
}

async function getPosts() {
    try {
        const result = await db.query(
            "SELECT post_id,user_post.username,caption,profile_pic_url,image_media_url,posted_at FROM user_post JOIN users ON users.username = user_post.username ORDER BY user_post.posted_at DESC"
        );
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function getMyPosts(username) {
    try {
        const response = await db.query(
            "SELECT post_id,user_post.username,caption,profile_pic_url,image_media_url,posted_at FROM user_post JOIN users ON users.username = user_post.username WHERE user_post.username = $1 ORDER BY user_post.posted_at DESC",
            [username]
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

export {insertUserPost, getPosts, getMyPosts};