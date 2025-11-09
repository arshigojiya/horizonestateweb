import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import ObjectId from 'bson-objectid';

const CONTACTS_FILE_PATH = path.join(process.cwd(), 'app', 'database', 'contacts.json');

export async function POST(req: Request) {
  try {
    const { name, email, number, message } = await req.json();

    // Validation for required fields
    if (!name || !email || !number || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    let contacts = [];
    try {
      const fileData = await fs.readFile(CONTACTS_FILE_PATH, 'utf-8');
      contacts = fileData ? JSON.parse(fileData) : [];
    } catch {
      // If there's an error (e.g., file doesn't exist), initialize the file with an empty array
      await fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
    

    // Create a new contact object
    const newContact = { 
      id: ObjectId().toHexString(), 
      name, 
      email, 
      number, 
      message 
    };

    // Add the new contact to the contacts array
    contacts.push(newContact);

    // Save the updated contacts array to the JSON file
    await fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2), 'utf-8');

    // Return success response with the new contact data
    return NextResponse.json({
      message: 'Contact saved successfully',
      contact: {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        number: newContact.number,
        message: newContact.message,
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error during contact creation:', error);
    return NextResponse.json({ message: 'Error in contact creation', error: errorMessage }, { status: 500 });
  }
}
