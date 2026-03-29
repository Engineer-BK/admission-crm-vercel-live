import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function POST(req: Request) {
  const { applicantId } = await req.json()

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const applicant = await tx.applicant.findUnique({
        where: { id: parseInt(applicantId) },
        include: { program: { include: { seatMatrix: true } } }
      })

      if (!applicant) throw new Error('Applicant not found')
      if (applicant.seatStatus !== 'APPLIED') throw new Error('Applicant already allocated or confirmed')

      const matrix = applicant.program.seatMatrix
      if (!matrix) throw new Error('Seat matrix not configured for this program')
      
      const quota = applicant.quotaType

      // Check availability based on quota
      if (quota === 'KCET' && matrix.kcetFilled >= matrix.kcetSeats)
        throw new Error('KCET quota is full')
      if (quota === 'COMEDK' && matrix.comedkFilled >= matrix.comedkSeats)
        throw new Error('COMEDK quota is full')
      if (quota === 'Management' && matrix.mgmtFilled >= matrix.mgmtSeats)
        throw new Error('Management quota is full')

      // Increment the right counter atomically
      const updateField = quota === 'KCET' ? { kcetFilled: { increment: 1 } }
                        : quota === 'COMEDK' ? { comedkFilled: { increment: 1 } }
                        : { mgmtFilled: { increment: 1 } }

      await tx.seatMatrix.update({
        where: { programId: applicant.programId },
        data: updateField
      })

      await tx.applicant.update({
        where: { id: parseInt(applicantId) },
        data: { seatStatus: 'ALLOCATED' }
      })
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
