import { promises as fs } from 'fs';
import path from "path";

const datafile = path.join(process.cwd(), 'app', 'database', 'property.json');

export const GET = async () => {
    try {
        let properties = [];

        try {
            // Read the properties data from the JSON file
            const fileData = await fs.readFile(datafile, 'utf-8');
            properties = fileData ? JSON.parse(fileData) : [];
        } catch  {
                await fs.writeFile(datafile, JSON.stringify([], null, 2), 'utf-8');
        }

        return new Response(
            JSON.stringify({
                message: "Property listings retrieved successfully",
                data: properties,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to retrieve property listings", error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
