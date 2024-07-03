import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "@/models/user";
import connect from '@/lib/db'

export const POST = async (req, ctx) => {
    try {
        const { email, password } = await req.json()
        await connect()
        const user = await User.findOne({ email })
        if (!user)
            return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 })

        const passCorrect = await bcrypt.compare(password, user.hashPass);
        if (!passCorrect)
            return new NextResponse(JSON.stringify({ error: 'Credential Invalid' }), { status: 400 })

        const userForToken = {
            id: user._id,
            email: user.email
        };

        const token = await jwt.sign(userForToken, process.env.SECRET)
        return new NextResponse(JSON.stringify({ token, email: user.email, username: user.username }), { status: 200 })
    } catch (err) {
        console.log(err)
    }
}