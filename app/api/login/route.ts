import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // First, get the hashed password for this email
        const userResult = await query<{ username: string, password_hash: string }>(
            'SELECT username, password_hash FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Compare the provided password with the stored hash
        const isValidPassword = await bcrypt.compare(
            password,
            userResult.rows[0].password_hash
        );

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            username: userResult.rows[0].username
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 