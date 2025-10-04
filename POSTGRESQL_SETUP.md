# PostgreSQL Setup for EduSync

This guide will walk you through setting up PostgreSQL for the EduSync application.

## Prerequisites

- PostgreSQL 12+ installed on your system or server
- Basic understanding of SQL and database management
- Access to a terminal or command prompt

## Step 1: Install PostgreSQL

If you haven't already installed PostgreSQL, you can download it from the official website:
https://www.postgresql.org/download/

Follow the installation instructions for your operating system.

## Step 2: Create the Database

1. Open a terminal/command prompt and connect to PostgreSQL:

```bash
# For Windows (using psql if it's in your PATH)
psql -U postgres

# For Linux/Mac
sudo -u postgres psql
```

2. Create a new database for the application:

```sql
CREATE DATABASE edusync;
```

3. Connect to the newly created database:

```sql
\c edusync
```

4. Exit psql:

```sql
\q
```

## Step 3: Run the Schema Creation Scripts

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
Run the following SQL scripts in order to set up the database schema:

1. First, run the initialization script:

```bash 
# Using psql command line
psql -U postgres -d edusync -f 00_initialize_database.sql

# Or if you're already in psql
\i 00_initialize_database.sql
```

2. Then, run the core tables creation script:

```bash
psql -U postgres -d edusync -f 01_create_core_tables.sql

# Or if you're already in psql
\i 01_create_core_tables.sql
```

3. Next, create the database views (optional):

```bash
psql -U postgres -d edusync -f database_views.sql

# Or if you're already in psql
\i database_views.sql
```

4. Finally, run the demo data script (optional, for testing):

```bash
psql -U postgres -d edusync -f demo_data.sql

# Or if you're already in psql
\i demo_data.sql
```

## Step 4: Set Up Environment Variables

1. Update the `.env` file in the `backend` directory with your PostgreSQL credentials:

```
# PostgreSQL Database Connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edusync
DB_USER=postgres
DB_PASSWORD=YourPasswordHere

# Application Config
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:8080

# Security
JWT_SECRET=your_jwt_secret_here
```

2. Update the values with your actual PostgreSQL credentials.

## Step 5: Verify the Connection

1. Start the development server:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

2. The application should now be connected to your PostgreSQL database.
3. Check the console logs for database connection information.

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Verify your PostgreSQL service is running
2. Check that your credentials in the `.env` file are correct
3. Ensure the database exists and is accessible
4. Check for firewall issues if connecting to a remote database

### Schema Issues

If you encounter schema-related errors:

1. Make sure all scripts ran successfully without errors
2. Check that you ran the scripts in the correct order
3. Verify that the database user has appropriate permissions

## Using Mock Data for Development

If you can't connect to PostgreSQL or want to develop without a database:

1. The application is designed to fall back to mock data when a database connection is not available
2. This behavior is controlled by the `shouldUseMockData()` function in `src/utils/database/config.ts`

## Backup & Restore

To backup your database:

```bash
pg_dump -U postgres -d edusync > backup_filename.sql
```

To restore from a backup:

```bash
psql -U postgres -d edusync < backup_filename.sql
```

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node-Postgres Documentation](https://node-postgres.com/)