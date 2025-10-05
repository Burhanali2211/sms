# Initialize Database on Render

This guide explains how to initialize your PostgreSQL database on Render after deploying your backend service.

## Prerequisites

1. Your backend service deployed on Render
2. Database credentials (already configured in render.yaml)

## Steps to Initialize Database

### 1. Connect to Your Backend Service via SSH

1. Go to your Render Dashboard
2. Navigate to your `edusync-backend` service
3. Click on "Connect" → "Connect to SSH"

### 2. Run the Database Initialization Script

Once connected via SSH, run the following command:

```bash
node init-database.js
```

This script will:
- Connect to your PostgreSQL database
- Run the SQL schema files to create tables
- Insert sample data

### 3. Verify Database Initialization

You can verify that the database was initialized correctly by checking the output of the script. It should show:
- Connection to database successful
- Tables created successfully
- Sample data inserted successfully

### 4. Troubleshooting

If you encounter any issues:

1. **Connection Errors**:
   - Verify database credentials in render.yaml
   - Ensure the database is running
   - Check that the database firewall allows connections from your backend service

2. **Script Errors**:
   - Check the error message for specific details
   - Verify that all required SQL files exist in the sql directory
   - Ensure the database user has proper permissions

### 5. Manual Database Initialization (Alternative)

If the script doesn't work, you can manually initialize the database:

1. Connect to your Render PostgreSQL database using a PostgreSQL client
2. Run the SQL files in this order:
   - `sql/00_initialize_database.sql`
   - `sql/01_create_core_tables.sql`
   - `sql/02_insert_sample_data.sql`

### 6. Verify Database Contents

After initialization, you can verify the database contents by:

1. Connecting to your database with a PostgreSQL client
2. Running queries to check tables and data:
   ```sql
   -- List all tables
   \dt
   
   -- Check users table
   SELECT COUNT(*) FROM users;
   
   -- Check some sample data
   SELECT * FROM classes LIMIT 5;
   ```

## Next Steps

After successfully initializing your database:

1. Test your backend API endpoints
2. Deploy your frontend application
3. Verify end-to-end functionality

## Useful Commands

```bash
# Check if database connection works
node -e "require('./backend/config/database').testConnection().then(console.log).catch(console.error)"

# Run specific SQL file
psql $DATABASE_URL -f sql/01_create_core_tables.sql
```

## Support

If you continue to experience issues:

1. Check Render logs for your backend service
2. Verify environment variables are set correctly
3. Contact Render support with specific error messages