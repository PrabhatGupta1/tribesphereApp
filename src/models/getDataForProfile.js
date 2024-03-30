import { db } from "../config/db.js";

//function to retriev user data
async function getUser(username) {
    const result = await db.query("SELECT username,fullname,bio,profile_pic_url,profile_cover_url FROM users WHERE username = $1",[username]);
    return result.rows;
}

//function to retriev data from hobby, interest, goals table...
async function retrievData(table_name) {
    const result = await db.query(
        "SELECT * FROM "+table_name
    );
    return result.rows;
}


//function to get users qualities 
async function getUsersQualities(user_name,referenced_table,referencing_table) {
    const result = await db.query(
        "SELECT * FROM "+referenced_table+" as a JOIN "+referencing_table+" as b ON b.username = $1 AND b."+referenced_table+"_id = a."+referenced_table+"_id",
        [user_name]
    );
    return result.rows;
}

//function to get user goals
async function getUserGoals(username) {
    const result = await db.query(
        "SELECT * FROM user_goals WHERE username = $1",
        [username]
    );

    return result.rows;
}

export {getUser,retrievData,getUserGoals,getUsersQualities};