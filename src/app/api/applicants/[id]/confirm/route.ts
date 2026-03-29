import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const applicantId = parseInt(id);
    let newAdmNo = '';

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const applicant = await tx.applicant.findUnique({
        where: { id: applicantId },
        include: { program: { include: { dept: { include: { campus: { include: { institution: true } } } } } } }
      });

      if (!applicant) throw new Error('Applicant not found');
      
      // Confirmation Rules checking
      if (applicant.feeStatus !== 'PAID') throw new Error('Fee must be PAID before confirmation');
      if (applicant.seatStatus !== 'ALLOCATED') throw new Error('Seat must be ALLOCATED before confirmation');
      if (applicant.admissionNumber) throw new Error('Admission already confirmed. Admission number is immutable.');

      // Generating Admission Number
      const count = await tx.applicant.count({
        where: { programId: applicant.programId, quotaType: applicant.quotaType, seatStatus: 'CONFIRMED' }
      });

      const instCode = applicant.program.dept.campus.institution.code;
      
      newAdmNo = [
        instCode,
        new Date().getFullYear(),
        applicant.program.courseType,
        applicant.program.code,
        applicant.quotaType,
        String(count + 1).padStart(4, '0')
      ].join('/');

      await tx.applicant.update({
        where: { id: applicantId },
        data: {
          seatStatus: 'CONFIRMED',
          admissionNumber: newAdmNo
        }
      });
    });

    return NextResponse.json({ admissionNumber: newAdmNo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
