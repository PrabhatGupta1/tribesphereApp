import { establishConnection, demolishConnection, getSuggestedConnections, getConnectionCount } from "../models/suggestConnections.js";

const handleConnectionRequest = async (req,res,reactToRequest)=> {
    if(req.isAuthenticated()){
        try {
            const connection_id = req.body.connection_id;
            reactToRequest(connection_id);
            res.redirect("/profile");
        } catch (error) {
            console.log(error);
            res.send("Error occured taking this action.");
        }
    } else {
        res.redirect("/login");
    }
}

const acceptConnectionRequest =  async (req,res)=> {
    handleConnectionRequest(req,res,establishConnection);
}

const ignoreConnectionRequest = async (req,res)=> {
    handleConnectionRequest(req,res,demolishConnection);
}

const provideSuggestedConnections = async (req,res)=>{
    if(req.isAuthenticated) {
        try {
            const result = await getSuggestedConnections(req.user.username);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login")
    }
}

const connectionCount = async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
            const result = await getConnectionCount(req.user.username);
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/login");
    }
}

export {acceptConnectionRequest, ignoreConnectionRequest, provideSuggestedConnections, connectionCount};