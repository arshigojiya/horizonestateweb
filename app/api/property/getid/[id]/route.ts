import { promises as fs } from 'fs';
import path from "path";

const datafile = path.join(process.cwd(), 'app', 'database', 'property.json');

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const fileData = await fs.readFile(datafile, 'utf-8');
        const properties = fileData ? JSON.parse(fileData) : [];

        const property = properties.find(async (property: { id: string }) => property.id === (await params).id);

        if (!property) {
            return new Response(
                JSON.stringify({ message: 'Property not found' }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Property retrieved successfully",
                data: property,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to retrieve property", error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
