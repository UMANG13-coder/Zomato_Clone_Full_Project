import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ details: { type: String }, for: { type: String } }],
        phoneNumber: [{ type: Number }],
    },
    {
        timestamps: true,
    })

UserSchema.method.genrateJsonWebTokens = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp");
}

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModal.findone({ email });
    const checkUserByPhone = await UserModal.findone({ phoneNumber });
    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exists !!");
    }

    return false;
}

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await UserModal.findOne({ email, password });

    if (!user) {
        throw new Error("User does Not Exists !!");
    }

    // current password comapre with database password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("Invalid Credentials !!");

    return user;
}

UserSchema.pre('save', function (next) {
    const user = this;

    //password is modified
    if (user.isModified('password')) return next();

    //password encrypted salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            user.password = hash;
            return next();
        })
    })
})

export const UserModal = mongoose.model("users", UserSchema)