# Admission Management & CRM

## 📌 Project Overview
A web-based Admission Management system built for colleges to manage the end-to-end admission process. Features include master setup (institutions, programs), applicant management, real-time seat allocation with strict quota enforcement, document verification, fee tracking, and generating unique immutable admission numbers.

Produced as an assignment for Edumerge.

## 🚀 Features Implemented (As per BRS)
- **Master Setup:** Complete configuration for Institutions, Campuses, Departments, Programs, and Quotas.
- **Seat Matrix & Quotas:** Real-time quota enforcement (KCET, COMEDK, Management) preventing overbooking.
- **Applicant Management:** Track basic details, documents, and fee status.
- **Admissions Workflow:** Strict flow for allocating seats, verifying documents, paying fees, and finally confirming admission.
- **Immutable Admission Number:** Generates structured admission number (e.g., `INST/2026/UG/CSE/KCET/0001`) upon final confirmation.
- **Monitoring Dashboard:** Live metrics on pending fees, pending documents, and overall seat availability per program.

## 💻 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database ORM:** Prisma
- **Database:** SQLite (for easy local setup without database servers)
- **Styling:** Tailwind CSS V4
- **Language:** TypeScript

---

## 🛠️ Setup Instructions (Local Deployment)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd admission-crm
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize the Database
This project uses SQLite. The initial migration will set up the tables locally.
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🤖 AI Tools Disclosure
As permitted in the assignment guidelines, AI tools were utilized to aid in the development process:
- **Tool Used:** Gemini Advanced (AI Coding Assistant)
- **What was assisted:**
  - Generating boilerplates for Next.js 15 API routes and server actions.
  - Designing UI components with Tailwind CSS for rapid prototyping.
  - Writing the Prisma Scheme layout, relationships, and queries (including the atomic SQL transactions for Seat Matrices).
  - Resolving Next.js 15 `Promise` unwrapping breaking changes for dynamic route parameters (e.g., `[id]`).
  - Analyzing BRS constraints to map them correctly into the database rules. 

*(**Note:** Fully understand your Prisma `$transaction` code inside `allocate/route.ts` and `confirm/route.ts`, as you will be required to explain how you enforced the quota rules and atomic allocations without race conditions during your technical interview!)*
