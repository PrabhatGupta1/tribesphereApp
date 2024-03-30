import { db } from "../config/db.js";

//fuction to get suggested connections....
async function getSuggestedConnections(username) {
    const result = await db.query(
        "(select * from users where username in (select username from users_hobby where hobby_id in (select hobby_id from users_hobby where username = $1) and username != $1) UNION select * from users where username in (select username from users_interest where interest_id in (select interest_id from users_interest where username = $1) and username != $1)) EXCEPT SELECT * FROM users WHERE username IN (SELECT username2 FROM connections WHERE username1 = $1 UNION SELECT username1 FROM connections WHERE username2 = $1)",
        [username]
    );
    
    return result.rows;
}

//get user connections 
async function getUserConnections(username) {
    const result = await db.query(
        "SELECT * from users WHERE username IN ((SELECT username1 FROM connections WHERE username2 = $1 AND status = $2) UNION (SELECT username2 FROM connections WHERE username1 = $1 AND status = $2))",
        [username,true]
    );
    return result.rows;
}

//get connection status 
async function getPendingConnections(username) {
    const result = await db.query(
        "SELECT * from users WHERE username IN (SELECT username2 FROM connections WHERE username1 = $1 AND status = $2)",
        [username,false]
    );
    return result.rows;
}

//get connection requests
//"SELECT * FROM users WHERE username IN (SELECT username1 FROM connections WHERE username2 = $1 AND status = $2)",
async function getConnectionRequests(username) {
    const result = await db.query(
        "SELECT username,fullname,bio,profile_pic_url,connection_id FROM users JOIN connections ON (users.username = connections.username1 AND (connections.username2 = $1 AND connections.status = $2))",
        [username,false]
    );
    return result.rows;
}

//update connection status
async function establishConnection(connection_id) {
    try {
        await db.query(
            "UPDATE connections SET status = $1 WHERE connection_id = $2",
            [true,connection_id]
        );
    } catch (error) {
        console.log(error);
    }
}

//delete connection if user chose to ignore it
async function demolishConnection(connection_id) {
    try {
        await db.query(
            "DELETE FROM connections WHERE connection_id = $1",
            [connection_id]
        )
    } catch (error) {
        console.log(error);
    }
}

//get connection count 
async function getConnectionCount(username) {
   const result = await db.query(
        "select Count(connection_id) from connections where (username1 = $1 or username2 = $1) and status = $2",
        [username,true]
   );
   return result.rows[0];
}

export {getSuggestedConnections, getPendingConnections, getUserConnections, getConnectionRequests, establishConnection, demolishConnection, getConnectionCount};
