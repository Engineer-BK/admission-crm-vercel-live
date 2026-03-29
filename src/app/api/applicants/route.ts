import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  
  let whereClause: any = {};
  if (status) whereClause.seatStatus = status;
  if (search) whereClause.name = { contains: search };
  
  const applicants = await prisma.applicant.findMany({
    where: whereClause,
    include: { program: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(applicants);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const applicant = await prisma.applicant.create({
      data: {
        name: body.name,
        dob: body.dob,
        gender: body.gender,
        email: body.email,
        phone: body.phone,
        category: body.category,
        entryType: body.entryType,
        quotaType: body.quotaType,
        marks: parseFloat(body.marks),
        qualifyingExam: body.qualifyingExam,
        allotmentNumber: body.allotmentNumber || null,
        address: body.address,
        fatherName: body.fatherName,
        aadharNumber: body.aadharNumber,
        programId: parseInt(body.programId)
      }
    });
    return NextResponse.json(applicant, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
