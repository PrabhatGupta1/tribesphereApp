import { db } from "../config/db.js";

//Add new hobby/interest/goal
async function addNewPassion(username,passion,newPassion,description) {
    const result = await db.query(
        "SELECT "+passion+"_id FROM "+passion+" WHERE "+passion+" = $1",
        [newPassion]
    );
    const passion_id = result.rows[0][passion+"_id"];
    await db.query(
        "INSERT INTO users_"+passion+" VALUES ($1,$2,$3)",
        [username,passion_id,description]
    ); 
}

export {addNewPassion};