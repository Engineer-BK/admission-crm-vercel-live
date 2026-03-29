import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.applicant.deleteMany();
  await prisma.seatMatrix.deleteMany();
  await prisma.program.deleteMany();
  await prisma.department.deleteMany();
  await prisma.campus.deleteMany();
  await prisma.institution.deleteMany();

  const inst = await prisma.institution.create({
    data: {
      name: 'Edumerge University',
      code: 'INST',
      campuses: {
        create: { name: 'Main Campus' }
      }
    },
    include: { campuses: true }
  });
  const mainCampus = inst.campuses[0];

  const cseDept = await prisma.department.create({ data: { name: 'Computer Science', campusId: mainCampus.id } });
  const eceDept = await prisma.department.create({ data: { name: 'Electronics', campusId: mainCampus.id } });

  const cseProgram = await prisma.program.create({
    data: {
      name: 'Computer Science and Engineering', code: 'CSE', deptId: cseDept.id,
      courseType: 'UG', entryType: 'Regular', admissionMode: 'Government', academicYear: '2025-26',
      seatMatrix: { create: { totalIntake: 100, kcetSeats: 60, comedkSeats: 20, mgmtSeats: 20 } }
    }
  });

  const eceProgram = await prisma.program.create({
    data: {
      name: 'Electronics and Communication Engineering', code: 'ECE', deptId: eceDept.id,
      courseType: 'UG', entryType: 'Regular', admissionMode: 'Government', academicYear: '2025-26',
      seatMatrix: { create: { totalIntake: 60, kcetSeats: 30, comedkSeats: 20, mgmtSeats: 10 } }
    }
  });

  const mbaProgram = await prisma.program.create({
    data: {
      name: 'Master of Business Administration', code: 'MBA', deptId: cseDept.id,
      courseType: 'PG', entryType: 'Regular', admissionMode: 'Management', academicYear: '2025-26',
      seatMatrix: { create: { totalIntake: 40, kcetSeats: 0, comedkSeats: 0, mgmtSeats: 40 } }
    }
  });

  await prisma.applicant.create({
    data: {
      name: 'John Doe', dob: '2005-05-15', gender: 'Male', email: 'john@example.com', phone: '9876543210',
      category: 'GM', entryType: 'Regular', quotaType: 'KCET', marks: 85.5, qualifyingExam: '12th Board',
      allotmentNumber: 'KCET-001', address: '123 Main St', fatherName: 'Robert Doe', aadharNumber: '123456789012',
      programId: cseProgram.id, docStatus: 'PENDING', feeStatus: 'PENDING', seatStatus: 'APPLIED'
    }
  });
  
  await prisma.applicant.create({
    data: {
      name: 'Jane Smith', dob: '2004-08-22', gender: 'Female', email: 'jane@example.com', phone: '9876543211',
      category: 'OBC', entryType: 'Regular', quotaType: 'COMEDK', marks: 92.0, qualifyingExam: '12th Board',
      allotmentNumber: 'COM-002', address: '456 Oak Rd', fatherName: 'Michael Smith', aadharNumber: '123456789013',
      programId: cseProgram.id, docStatus: 'VERIFIED', feeStatus: 'PAID', seatStatus: 'ALLOCATED'
    }
  });

  console.log('Seed completed successfully.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
