import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.seatMatrix.findMany({ include: { program: true } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { programId, totalIntake, kcetSeats, comedkSeats, mgmtSeats } = body;
    
    // Rule 1: Validate sum before saving
    if (Number(kcetSeats) + Number(comedkSeats) + Number(mgmtSeats) !== Number(totalIntake)) {
      return NextResponse.json({ error: 'Quota sum must equal total intake' }, { status: 400 });
    }

    const matrix = await prisma.seatMatrix.upsert({
      where: { programId: parseInt(programId) },
      update: {
        totalIntake: parseInt(totalIntake),
        kcetSeats: parseInt(kcetSeats),
        comedkSeats: parseInt(comedkSeats),
        mgmtSeats: parseInt(mgmtSeats)
      },
      create: {
        programId: parseInt(programId),
        totalIntake: parseInt(totalIntake),
        kcetSeats: parseInt(kcetSeats),
        comedkSeats: parseInt(comedkSeats),
        mgmtSeats: parseInt(mgmtSeats)
      }
    });
    return NextResponse.json(matrix, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
