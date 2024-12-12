import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        
        // Generate salt and hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store user with hashed password using Prisma
        const user = await prisma.Users.create({
            data: {
                email,
                username,
                password_hash: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 