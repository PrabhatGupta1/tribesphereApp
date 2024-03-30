import 'dotenv/config';
import express from "express";
import bodyParser from 'body-parser';
import { db } from './src/config/db.js';
import sessionMiddleware from './src/middleware/sessionMiddleware.js';
import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from "bcrypt";
import userProfileRoutes from "./src/routes/userProfileRoute.js";
// import appRoutes from "./src/routes/indexRouter.js";
import connectionRoutes from "./src/routes/manageConnections.js";
import postRoutes from "./src/routes/manageUserPosts.js";
import path, {dirname} from "path";
import { fileURLToPath } from 'url';
import flash from "connect-flash";

// import corsSetup from './src/config/corsConfig.js';
import cors from "cors";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.set('view engine','ejs');

//handling cors setup
const corsOptions = {
    origin: "http://localhost:3000",
    method: "GET, POST, PATCH, PUT, DELETE",
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

db.connect();

passport.use(
    new LocalStrategy(async (username,password,done)=> { 
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
            
            if(result.rows.length>0) {
                const user = result.rows[0];
                const isPasswordMatch = await bcrypt.compare(password,user.password);

                if(isPasswordMatch) {
                    return done(null,user);
                } else {
                    return done(null,false, {message : "Incorrect Password"});
                }
            } else {
                return done(null,false, {message : "User not found"});
            }
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user,done)=> {
    return done(null,user.username);
});

passport.deserializeUser(async (username,done)=> {
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);

        if(result.rows.length>0) {
            const user = result.rows[0];
            return done(null,user);
        } else {
            return done(null,false);
        }
    } catch (error) {
        return done(error);
    }
});


app.use(userProfileRoutes);

app.get("/",(req,res) => {
    res.render("index.ejs");
});

app.get("/signup",(req,res) => {
    res.render("signup");
});

app.get("/login",(req,res)=> {
    res.render("login", { message: req.flash('error') });
});

app.post("/signup", async (req,res)=> {
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
});

app.post("/login",  passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),  async (req,res)=> {
        res.redirect("/profile");
});

app.get("/logout", (req,res,next)=> {
    req.logout(function(err){
        if(err) {
            next(err);
        }
    });
    res.redirect("/login");
});

app.use(express.static(path.join(__dirname, './Client/post-app/build')));

app.get("/home",(req,res)=>{
    if(req.isAuthenticated()) {
        res.sendFile(path.join(__dirname,'/Client/post-app/build/index.html'));
    } else {
        res.redirect("/login");
    }
});

app.get("/about",(req,res) => {
    res.render("about");
});

// app.use(appRoutes);
app.use(connectionRoutes);
app.use(postRoutes);

app.post("/update/connection", async (req,res)=>{
    console.log(req.body);
    if(req.isAuthenticated()) {
        try {
            const {userToConnect} = req.body;
            const result = db.query(
                "INSERT INTO connections (username1, username2, status) VALUES ($1, $2, $3)",
                [req.user.username,userToConnect,false]
            );
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("login");
    }
});

app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});