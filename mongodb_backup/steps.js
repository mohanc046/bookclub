/**
 * Installed mongo_db locally
 * 
 * Reference : https://hevodata.com/learn/macos-mongo-shell/
 * 
 * run mongodb : brew services start mongodb-community@5.0
 * 
 * run : mongod for connection
 * 
 * run : mongosh
 * 
 * stop mongodb : brew services stop mongodb-community@5.0
 * 
 * Create user for accessing DB
 * 
 * db.createUser({ 
 *           user : "Mohan" ,
 *           pwd : "mohan", 
 *           roles : [ 
 *                    { role : "userAdminAnyDatabase" , db : "admin"},
 *                    { role : "readWriteAnyDatabase" , db : "admin"},
 *                    { role : "dbAdminAnyDatabase" , db : "admin"},
 *                    { role: "clusterAdmin", db: "admin" }
 *                  ]
 * })
 * 
 * 
 * 
 * dump entire DB -> mongodump -d <database_name> -o <directory_backup>
 * 
 * restore entire DB ---> mongorestore -d <database_name> <directory_backup>

 * 
 */