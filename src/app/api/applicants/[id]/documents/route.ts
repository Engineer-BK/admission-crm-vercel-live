import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { docStatus } = await req.json();
    const applicant = await prisma.applicant.update({
      where: { id: parseInt(id) },
      data: { docStatus }
    });
    return NextResponse.json(applicant);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
