import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'user.json');

interface User {
    id: string;
    userData: string; // Adjust this type as per your actual user data
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
            const { id } = await context.params;


        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        let users: User[] = [];
        try {
            const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
            users = fileData ? JSON.parse(fileData) : [];
        } catch {
            return NextResponse.json({ message: 'No users found' }, { status: 404 });
        }

        // Find the user by ID
        const user = users.find((user: User) => user.id === id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Return the user data without the password
        const { userData } = user;
        return NextResponse.json({ user: userData });
        
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error';
        console.error('Error during fetching user data:', error);
        return NextResponse.json({ message: 'Error in fetching user data', error: errorMessage }, { status: 500 });
    }
}
