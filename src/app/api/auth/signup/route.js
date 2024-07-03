import User from '@/models/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import connect from '@/lib/db'

export const POST = async (req) => {
    try {
        const { username, email, password } = await req.json();
        const hashPass = await bcrypt.hash(password, 10)
        await connect()

        const user = new User({ username, email, hashPass })
        await user.save()
        return new NextResponse(JSON.stringify({ email, username }), { status: 201 })
    } catch (err) {
        console.log(err)
    }
}