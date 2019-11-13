import passport from 'passport'
import GoogleOAuth from 'passport-google-oauth20';
import config from './config.js';
import db from '../models/index.js'
//import User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserialzeUser", id)
    db.User.findOne({
        where: {
            googleId: id
        }
    }).then((user) => {
        console.log("found user with id", id)
        done(null, user);
    });
});

passport.use(
    new GoogleOAuth.Strategy(
        config.googleOAuth,
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken, profile)
            done(null, profile);
            // check if user already exists in our own db
            db.User.findOne({
                where: {
                    googleId: profile.id
                }
            }).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    db.User.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        thumbnail: profile.photos[0].value
                    }).then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    });
                }
            });
        })
);

export default {}
