// pages/_middleware.js
import { NextResponse } from 'next/server';
import { auth } from '../../lib/firebase';

export async function middleware(req) {
    const user = auth.currentUser;

    const url = req.nextUrl.clone();

    if (!user && url.pathname !== '/login') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (user && url.pathname === '/login') {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
