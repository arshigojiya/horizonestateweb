import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import ObjectId from 'bson-objectid';

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'categories.json');

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let categories = [];
    try {
      const fileData = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
      categories = fileData ? JSON.parse(fileData) : [];
    } catch (err: unknown) {
      if (err instanceof Error) {
        // The file does not exist, so we initialize it with an empty array
        await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
      } else {
        // Rethrow the error if it's not 'ENOENT'
        throw err;
      }
    }
    

    const existingCategory = categories.find((category: { name: string }) => category.name === name);
    if (existingCategory) {
      return NextResponse.json({ message: 'Category already exists' }, { status: 409 });
    }

    const newCategory = { id: ObjectId().toHexString(), name };

    categories.push(newCategory);

    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), 'utf-8');

    return NextResponse.json({
      message: 'Category saved successfully',
      category: {
        id: newCategory.id,
        name: newCategory.name,
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error during category creation:', error);
    return NextResponse.json({ message: 'Error in category creation', error: errorMessage }, { status: 500 });
  }
}
