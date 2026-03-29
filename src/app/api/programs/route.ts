import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.program.findMany({ include: { dept: { include: { campus: { include: { institution: true } } } } } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const program = await prisma.program.create({
      data: {
        name: body.name,
        code: body.code,
        deptId: parseInt(body.deptId),
        courseType: body.courseType,
        entryType: body.entryType,
        admissionMode: body.admissionMode,
        academicYear: body.academicYear,
      }
    });
    return NextResponse.json(program, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
