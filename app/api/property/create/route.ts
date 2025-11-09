import { promises as fs } from 'fs';
import path from "path";
import ObjectId from 'bson-objectid';

const datafile = path.join(process.cwd(), 'app', 'database', 'property.json');
const uploadDir = path.join(process.cwd(), 'public', 'upload');

export const POST = async (req: Request) => {
    try {
        await fs.mkdir(uploadDir, { recursive: true });

        const formData = await req.formData();
        const title = formData.get('title')?.toString();
        const price = formData.get('price')?.toString();
        const location = formData.get('location')?.toString();
        const services = formData.getAll('services').map(service => service.toString());
        const description = formData.get('description')?.toString();
        const agentid = formData.get('agentid')?.toString();

        const images = [];
        const imageFiles = formData.getAll('images') as File[];

        for (const file of imageFiles) {
            const filename = `${new ObjectId().toHexString()}-${file.name}`;
            const filePath = path.join(uploadDir, filename);
            const fileData = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, fileData);
            images.push(`/upload/${filename}`); 
        }

        let properties = [];
        
        try {
            const fileData = await fs.readFile(datafile, 'utf-8');
            properties = fileData ? JSON.parse(fileData) : [];
          } catch  {
              await fs.writeFile(datafile, JSON.stringify([], null, 2), 'utf-8');
          }

        const newProperty = {
            id: new ObjectId().toHexString(),
            title,
            price,
            location,
            images,
            services,
            description,
            agentid
        };

        if (!Array.isArray(properties)) {
            properties = []; 
        }

        properties.push(newProperty); 
        await fs.writeFile(datafile, JSON.stringify(properties, null, 2));

        return new Response(
            JSON.stringify({
                message: "Property listing created successfully",
                data: newProperty,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to create property listing", error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
