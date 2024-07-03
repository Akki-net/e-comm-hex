// middleware.ts
import { NextResponse } from 'next/server';
import connect from '@/lib/db'

export async function middleware(request) {
    try{
        await connect()
    }catch(err){
        console.log(err)
    }
}

// Matching Paths (configurable)
export const config = {
    matcher: '/api/auth/*',
};
