-- CreateTable
CREATE TABLE "Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Campus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,
    CONSTRAINT "Campus_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "campusId" INTEGER NOT NULL,
    CONSTRAINT "Department_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Program" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deptId" INTEGER NOT NULL,
    "courseType" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "admissionMode" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    CONSTRAINT "Program_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeatMatrix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "programId" INTEGER NOT NULL,
    "totalIntake" INTEGER NOT NULL,
    "kcetSeats" INTEGER NOT NULL DEFAULT 0,
    "kcetFilled" INTEGER NOT NULL DEFAULT 0,
    "comedkSeats" INTEGER NOT NULL DEFAULT 0,
    "comedkFilled" INTEGER NOT NULL DEFAULT 0,
    "mgmtSeats" INTEGER NOT NULL DEFAULT 0,
    "mgmtFilled" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "SeatMatrix_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "quotaType" TEXT NOT NULL,
    "marks" REAL NOT NULL,
    "qualifyingExam" TEXT NOT NULL,
    "allotmentNumber" TEXT,
    "address" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "programId" INTEGER NOT NULL,
    "docStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "feeStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "seatStatus" TEXT NOT NULL DEFAULT 'APPLIED',
    "admissionNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Applicant_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_code_key" ON "Institution"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SeatMatrix_programId_key" ON "SeatMatrix"("programId");
