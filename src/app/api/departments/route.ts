import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.department.findMany({ include: { campus: { include: { institution: true } } } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { name, campusId } = await req.json();
    const dept = await prisma.department.create({
      data: {
        name,
        campusId: parseInt(campusId)
      }
    });
    return NextResponse.json(dept, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
