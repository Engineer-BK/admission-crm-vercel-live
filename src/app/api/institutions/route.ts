import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.institution.findMany({ include: { campuses: true } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { name, code, campusName } = await req.json();
    const inst = await prisma.institution.create({
      data: {
        name,
        code,
        campuses: {
          create: { name: campusName }
        }
      },
      include: { campuses: true }
    });
    return NextResponse.json(inst, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
