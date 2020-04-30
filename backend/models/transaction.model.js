const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  tnx_id: String,
  description: String,
  user: String,
  date: Date,
});

module.exports = mongoose.model(
  "Transaction",
  TransactionSchema,
  "transaction"
);
