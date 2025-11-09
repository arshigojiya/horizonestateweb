import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import ObjectId from 'bson-objectid';

const DATA_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'user.json');

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let users = [];
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
      users = fileData ? JSON.parse(fileData) : [];
    } catch  {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }

    const existingUser = users.find((user: { email: string; }) => user.email === email);
    
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const newUser = { id: ObjectId().toHexString(), username, email, password };

    users.push(newUser);

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');

    return NextResponse.json({
      message: 'User saved successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error during signup:', error); 
    return NextResponse.json({ message: 'Error in signup', error: errorMessage }, { status: 500 });
  }
}
