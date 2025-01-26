import mongoose, {Schema} from "mongoose";
import { User } from "../types/UserTypes";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema<User>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, trim: true},
    },
    {timestamps: true, versionKey: false}
);

UserSchema.pre<User>('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.password;
    return userObj;
}

export const UserModel = mongoose.model<User> ('User', UserSchema);