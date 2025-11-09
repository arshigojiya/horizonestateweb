import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'categories.json');

export async function GET() {
  try {
    // Read categories from the JSON file
    const fileData = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const categories = fileData ? JSON.parse(fileData) : [];

    // Return the categories as JSON
    return NextResponse.json({
      message: 'Categories retrieved successfully',
      categories: categories,
    });
  } catch (error: unknown) {
    console.error('Error retrieving categories:', error);
    return NextResponse.json(
      { message: 'Error retrieving categories' },
      { status: 500 }
    );
  }
}
