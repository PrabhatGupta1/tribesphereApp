import { retrievData, getUser, getUserGoals, getUsersQualities } from "../models/getDataForProfile.js";
import { getSuggestedConnections, getPendingConnections, getUserConnections, getConnectionRequests, getConnectionCount } from "../models/suggestConnections.js";

const renderProfile = async (req,res)=> {
    if(req.isAuthenticated()) {
        try {
            const otherUserName = req.query.user;
            const [otherUser] = await getUser(otherUserName);
            const hobbies = await retrievData('hobby');
            const interests = await retrievData('interest');
            const goals = await retrievData('goal');
            const userHobbies = await getUsersQualities(otherUserName? otherUserName:req.user.username,'hobby','users_hobby');
            const userInterests = await getUsersQualities(otherUserName? otherUserName:req.user.username,'interest','users_interest');
            const userGoals = await getUserGoals(otherUserName? otherUserName:req.user.username);
            const suggestedConnections = await getSuggestedConnections(req.user.username);
            const pendingConnections = await getPendingConnections(req.user.username);
            const userConnections = await getUserConnections(req.user.username);
            const connectionRequests = await getConnectionRequests(req.user.username);
            const connectionCount = await getConnectionCount(otherUserName? otherUserName:req.user.username);
            res.render("profile",{
                isOriginalUser: otherUserName===undefined || otherUserName===req.user.username?true:false,
                user: otherUserName?otherUser:req.user,
                userHobbies: userHobbies,
                hobbies: hobbies,
                userInterests: userInterests,
                interests: interests,
                userGoals: userGoals,
                goals: goals,
                suggestedConnections: suggestedConnections,
                pendingConnections: pendingConnections,
                userConnections: userConnections,
                connectionRequests: connectionRequests,
                connectionCount: connectionCount
            });
        } catch (error) {
            console.error(error);
            res.send("Internal Server Error");
        }
    } else {
        res.redirect("/login");
    }
};

export {renderProfile};