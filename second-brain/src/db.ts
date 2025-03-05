
import mongoose, { Model, Schema } from "mongoose"
import { DB_URL } from "./config";


async function connect() {
    await mongoose.connect(DB_URL)
}

connect();



const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    UserId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const ShareSchema = new Schema({
    hash: String,
    UserId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true }
})

export const ContentModel = mongoose.model('Content', ContentSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const LinkModel = mongoose.model('Share', ShareSchema)
