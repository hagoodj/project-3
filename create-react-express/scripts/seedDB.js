const mongoose = require("mongoose");
const db = require("../mongodb_models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/userdb"
);
