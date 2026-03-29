import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.applicant.findUnique({
    where: { id: parseInt(id) },
    include: { program: true }
  });
  return NextResponse.json(data);
}
