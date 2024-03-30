import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from "bcrypt";
import { db } from "./db.js";

passport.use(
    new LocalStrategy(async (username,password,done)=> {
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
            
            if(result.rows.length>0) {
                const user = result.rows[0];
                const isPasswordMatch = bcrypt.compare(password,user.password);

                if(isPasswordMatch) {
                    return done(null,user);
                } else {
                    return done(null,false, {message : "Incorrect Password"});
                }
            } else {
                return done(null,false, {message : "User not found"});
            }
        } catch (error) {
            done(error);
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

export default passport;