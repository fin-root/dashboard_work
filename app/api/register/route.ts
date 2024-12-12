import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        
        // Generate salt and hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store user with hashed password
        await query(
            'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)',
            [email, hashedPassword, username]
        );

        return NextResponse.json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 