import PaymentSession from '@/libs/paymentSession';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    try { 
        const {bookId, token} = await req.json();
        const res = await PaymentSession(bookId,token);
        return NextResponse.json(res);
    }
    catch(e) {
        console.error('Error creating session:', e);
        return NextResponse.json({ message: 'An error occurred' });
    }
}
