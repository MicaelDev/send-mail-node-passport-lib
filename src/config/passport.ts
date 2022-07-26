import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { networkInterfaces } from 'os';


dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Não autorizado' };
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    } else {
        return done(notAuthorizedJson, false);
    }
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
}

//Middleware for route authentication 
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err, user) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    })(req, res, next);
}

export default passport;