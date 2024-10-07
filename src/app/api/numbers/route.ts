import { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        const data = await prisma.numeros.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });

        if(!data) return Response.json({error: "no data"}, {status: 404});

        return Response.json(data);
    } catch (error) {
        console.log(error);
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const data = await prisma.numeros.update({
            where: {
                id: body.id
            },
            data: {
                nombre: body.nombre,
                selecionado: body.selecionado
            }
        });

        if(!data) return Response.json({error: "no data"}, {status: 404});
        

        return Response.json(body);
    } catch (error) {
        console.log(error);
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}