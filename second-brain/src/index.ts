import express, { json } from "express";
import { Request, Response } from "express"
import bcrypt from "bcrypt";
import { z } from "zod";
import cors from "cors"
import { ContentModel, LinkModel, UserModel } from "./db";
import jwt from "jsonwebtoken"
import { JWT_CODE } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json())
app.use(cors());

app.post('/api/signup', async (req, res) => {

    const reqBodyval = z.object({
        username: z.string().min(3).max(15),
        password: z.string().min(8).max(20).toUpperCase().toLowerCase()
    })
    const parseData = reqBodyval.safeParse(req.body)

    const username = req.body.username;
    const password = req.body.password;

    if (!parseData.success) {
        res.json({
            message: "Incorrect Format",
            error: parseData.error
        })
    }
    try {
        const hashpassword = await bcrypt.hash(password, 5)
        await UserModel.create({
            username: username,
            password: hashpassword
        })
        res.json({
            message: "You are signed up!!"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post('/api/signin', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const User = await UserModel.findOne({
        username: username
    })

    if (!User) {
        res.status(403).json({
            message: "User is not present in Database"
        })
        return
    }

    const passwordCheck = await bcrypt.compare(password, User.password!);

    if (passwordCheck) {
        const token = jwt.sign({
            id: User._id
        }, JWT_CODE)

        res.json({
            token
        })
    } else {
        res.json({
            message: "Incorrect Credentialsz`"
        })
    }
})

app.post('/api/content', userMiddleware, async (req, res) => {

    const link = req.body.link;
    const type = req.body.type;

    ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        UserId: req.UserId,
        tages: []

    })
    res.json({

        message: "Add the Content"
    })
})

app.get('/api/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const UserId = req.UserId;
    const content = await ContentModel.find({
        UserId: UserId
    }).populate("UserId", "username")

    res.json({
        content
    })

})

// app.get('/api/content/youtube', userMiddleware, async (req, res) => {

//     const type = "youtube";
//     //@ts-ignore
//     const UserId = req.UserId;
//     const content = await ContentModel.find({
//         type: type,
//         UserId: UserId
//     }).populate("UserId", "username")
//     res.json({
//         content
//     })
// })


app.delete('/api/content/deleteall', userMiddleware, async (req, res) => {

    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        UserId: req.UserId
    })
    res.json({
        message: "Content Deleted"
    })
})

app.delete('/api/content/delete:contentId', userMiddleware, async (req, res) => {

    const contentId = req.params.contentId;

    await ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        UserId: req.UserId
    })
    res.json({
        message: "Content Deleted"
    })
})



app.post('/api/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existionLink = await LinkModel.findOne({
            //@ts-ignore
            UserId: req.UserId
        });
        if (existionLink) {
            res.json({
                hash: existionLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            UserId: req.UserId,
            hash: hash
        })
        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            UserId: req.UserId
        })
        res.json({
            message: "Removed Link"
        })
    }
})

app.get('/api/brain/:shareLink', async (req, res) => {

    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).json({
            message: "Sorry Incorrect input"
        })
        return;
    }
    const content = await ContentModel.find({
        UserId: link.UserId
    })
    const user = await UserModel.findOne({
        UserId: link.UserId
    })

    res.json({
        username: user?.username,
        content: content
    })

})


app.listen(3000)
function UserId(arg0: string): unknown {
    throw new Error("Function not implemented.");
}

