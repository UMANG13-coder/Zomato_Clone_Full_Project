import JwtPassport from 'passport-jwt'

import { UserModel } from '../database/allModules'

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp",
}

export default (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwtPayload, done) => {
            try {
                const doesUserExists = await UserModel.findById(jwtPayload.user);
                if (!doesUserExists) return done(null, false);
                return done(null, doesUserExists);
            } catch (error) {
                throw new Error(error);
            }
        })
    )
}