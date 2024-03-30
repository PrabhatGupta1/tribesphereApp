import session from 'express-session';

const sessionMiddleware = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
});

export default sessionMiddleware;