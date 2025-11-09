import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const DATA_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'user.json');
const JWT_SECRET = 'mahesh123'; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    let users = [];
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
      users = fileData ? JSON.parse(fileData) : [];
    } catch  {
        return NextResponse.json({ message: 'No users found' }, { status: 404 });
     
    }

    const user = users.find((user: { email: string; }) => user.email === email);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Error in login', error: errorMessage }, { status: 500 });
  }
}
