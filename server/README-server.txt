To prepare SQL:
1. run "sudo apt update" to update packages
2. run "start_sql" to start sql
3. run "mysql --host=127.0.0.1 < rtws5data.sql" to load the database in (mostly likely only have to do this once, or again when we change the database. 
(4. To make changes to SQL database, run "mysql --host=127.0.0.1". Type "exit" to exit.)

To prepare server:
1. enter "server" folder (cd server)
2. run "npm install" to set up the server
(for the steps below, generally you'd only have to do them once. These are for installing packages e.g. hash & salt, cookie onto the server so we can use them.
If you have encountered a reference error that says "xxx is not defined", try "npm install xxx".)
3. run "npm install argon2" for salt & hash
4. run "npm install sanitize-html" to sanitise html
5. run "npm install mysql" for sql
6. run "npm install express-session" for cookies (sessions)

To use server with SQL:
1. Make sure "start_sql" has been run! 
2. run "npm start" to start the server.
3. press "Ctrl + C" to stop the server from running. 
