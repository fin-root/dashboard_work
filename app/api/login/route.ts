import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Find user by email using Prisma
        const user = await prisma.Users.findUnique({
            where: {
                email: email
            },
            select: {
                username: true,
                password_hash: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Compare the provided password with the stored hash
        const isValidPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            username: user.username
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 