# ResumeFit

AI-powered resume-to-job matching platform for software engineers. Upload your resume, paste any job description, and get a brutally honest AI match score with skill gaps, weaknesses, and AI-rewritten bullets — in seconds.

## Features

- **Match Score Analysis** — Get a realistic 0-100 match score based on skill, experience, and seniority alignment
- **Smart Skill Gap Detection** — Identifies not just keyword mismatches but conceptual gaps like missing ownership signals or framework experience
- **Bullet Point Rewrites** — AI rewrites your weakest resume bullet with metrics, action verbs, and impact
- **Resume Parsing** — Automatically extracts and parses text from PDF resumes
- **Job Description Extraction** — Intelligently extracts job title and requirements from any job posting
- **Analysis History** — Track all your analyses in a dashboard and re-run after resume edits
- **ATS-Optimized Insights** — Surfaces the exact keywords and skills modern ATS scanners search for

## Tech Stack

- **Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend** — Next.js API routes, Node.js
- **Database** — PostgreSQL with Prisma ORM
- **AI/ML** — Google Gemini AI (multimodal)
- **Authentication** — NextAuth v5
- **PDF Parsing** — pdf-parse
- **Security** — bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API key
- NextAuth secret

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ResumeFit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/resumefit
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run db:generate` — Generate Prisma client
- `npm run db:migrate` — Run database migrations
- `npm run db:push` — Push schema changes to database
- `npm run db:studio` — Open Prisma Studio GUI

## Project Structure

```
.
├── app/
│   ├── api/                    # API routes
│   │   ├── analyze/           # Resume analysis endpoint
│   │   ├── register/          # User registration
│   │   └── auth/              # NextAuth routes
│   ├── analyze/               # Analysis page
│   ├── dashboard/             # User dashboard
│   ├── login/                 # Login/register page
│   ├── results/               # Analysis results page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                # Reusable components
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── db.ts                 # Prisma client
│   ├── gemini.ts             # Gemini AI integration
│   ├── parser.ts             # PDF parsing & text extraction
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Database Schema

### User Model
- `id` — Unique identifier (CUID)
- `email` — Unique email address
- `name` — User's full name
- `password` — Hashed password
- `createdAt` — Account creation timestamp
- `analyses` — Relationship to Analysis records

### Analysis Model
- `id` — Unique identifier (CUID)
- `userId` — Foreign key to User
- `resumeText` — Extracted resume content
- `jobText` — Job description text
- `matchScore` — 0-100 match score
- `resultJSON` — Full analysis result (JSON)
- `jobTitle` — Extracted job title
- `createdAt` — Analysis timestamp

## How It Works

### 1. Resume Upload & Parsing
- Users upload a PDF resume via the analyze page
- PDF is parsed using `pdf-parse` to extract text
- Text is stored in the database for future reference

### 2. Job Description Processing
- User pastes a job description (LinkedIn, Greenhouse, etc.)
- Job title is extracted intelligently
- Full job text is validated (minimum 50 characters)

### 3. AI Analysis with Gemini
- Resume text and job description sent to Google Gemini AI
- Gemini performs multi-dimensional analysis:
  - Matches skills against requirements
  - Identifies conceptual gaps
  - Generates realistic match score
  - Selects weakest bullet for rewrite
  - Provides improvement recommendations

### 4. Results Storage & Display
- Analysis results stored in PostgreSQL
- Match score, skill gaps, strengths, weaknesses saved
- Users can view in dashboard and re-analyze after edits

## Security & Privacy

- Resumes encrypted in transit (HTTPS)
- Passwords hashed with bcryptjs
- Database connections secured
- User data never shared or sold
- Authentication required for all analysis endpoints
- File upload validation (PDF only, max 5MB)

## API Endpoints

### POST `/api/analyze`
Analyze a resume against a job description.
- **Auth Required** — Yes
- **Body** — FormData with `resume` (PDF file) and `jobDescription` (text)
- **Returns** — Analysis ID and full result object

### POST `/api/register`
Create a new user account.
- **Auth Required** — No
- **Body** — JSON with `email`, `password`, `name`
- **Returns** — User object

## Development Tips

- **Type Safety** — All code is TypeScript; check types before committing
- **Database Changes** — Use `npm run db:push` or `npm run db:migrate`
- **API Testing** — Use Postman or curl to test endpoints
- **Gemini API** — Test with sample resumes before deploying