# EduSync School Management System

EduSync is a comprehensive school management system designed to streamline educational workflows, enhance communication between students, teachers, and administrators, and provide powerful tools for managing all aspects of school operations.

## Getting Started with PostgreSQL

This guide will help you migrate from the mock data setup to a full PostgreSQL database implementation.

### Prerequisites

- PostgreSQL 13 or higher installed
- Basic understanding of SQL and database concepts
- Node.js and npm installed

### Step 1: Set Up the PostgreSQL Database

1. Install PostgreSQL if you haven't already:
   - **Windows**: Download and run the installer from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: Use Homebrew `brew install postgresql`
   - **Linux (Ubuntu/Debian)**: `sudo apt install postgresql postgresql-contrib`

2. Create a new database for EduSync:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE edusync;

# Connect to the new database
\c edusync

# Exit psql
\q
```

### Step 2: Run the SQL Setup Scripts

You can either run the individual SQL files or use the provided setup scripts:

**Option 1: Using the setup scripts (recommended)**
```bash
# Navigate to the SQL folder
cd path/to/project/sql

# On Windows, run:
setup_database.bat

# On Linux/Mac, run:
chmod +x setup_database.sh
./setup_database.sh
```

**Option 2: Manual setup**
```bash
# From your command line, navigate to the SQL folder in your project
cd path/to/project/sql

# Run the initialization script
psql -U postgres -d edusync -f 00_initialize_database.sql

# Run the core tables creation script
psql -U postgres -d edusync -f 01_create_core_tables.sql

# (Optional) Load sample data
psql -U postgres -d edusync -f 02_insert_sample_data.sql
```

### Step 3: Configure the Application

1. Set up the environment variables for your PostgreSQL connection in `backend/.env`:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edusync
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:8080

# Security
JWT_SECRET=your_jwt_secret_here
```

2. If you're deploying to production, ensure these environment variables are set in your hosting environment.

### Step 4: Install PostgreSQL Client Package

Add the PostgreSQL client to your project dependencies:

```bash
npm install pg
npm install @types/pg --save-dev
```

### Step 5: Testing the Connection

After starting your application, check the console logs to ensure the database connection is successful.

## Netlify DB Integration

This project now supports Netlify DB for simplified database operations. The Netlify DB uses the `@netlify/neon` package to connect to your PostgreSQL database.

### Installation

The `@netlify/neon` package has already been added to this project:

```bash
npm install @netlify/neon
```

### Usage Examples

To use Netlify DB in your functions:
```javascript
import { neon } from '@netlify/neon';

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
```

### Available Resources

1. Example Netlify function using the database: `netlify/functions/sample-db-query.js`
2. Frontend utility functions: `src/utils/netlify-db.ts`
3. Example React component: `src/components/NetlifyDBExample.tsx`
4. Integration documentation: `NETLIFY_DB_INTEGRATION.md`
5. Deployment instructions: `NETLIFY_DEPLOYMENT_INSTRUCTIONS.md`
6. Troubleshooting guide: `NETLIFY_DB_TROUBLESHOOTING.md`

### Fallback Solution

If Netlify DB is not available (due to service issues or regional restrictions), the application will automatically fall back to the traditional PostgreSQL connection using the environment variables configured above.

## Deployment

For detailed deployment instructions, please see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

### Deploy to Netlify (Recommended for Frontend)

For easy frontend deployment, follow the [Netlify Deployment Guide](NETLIFY_DEPLOYMENT_GUIDE.md).

You can also use the deployment helper scripts:
- On Windows: Run `deploy.bat`
- On Linux/Mac: Run `deploy.sh`

**Note**: For security reasons, never commit actual API keys to the repository. Use environment variables instead.
# sms
# sms
# sms

## Netlify DB Integration

This project now supports Netlify DB for simplified database operations. The Netlify DB uses the `@netlify/neon` package to connect to your PostgreSQL database.

To use Netlify DB in your functions:
```javascript
import { neon } from '@netlify/neon';

const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
```

Example Netlify function using the database is available at `netlify/functions/sample-db-query.js`.

Frontend utility functions are available in `src/utils/netlify-db.ts`.