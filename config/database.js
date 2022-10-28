const mongoose = require('mongoose'); // requires/loads mongoose library

mongoose.connect(process.env.DATABASE_URL);
// all of the .env properties will be available to us via the process object.
// it is in every node app.

// shortcut variable to the mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
