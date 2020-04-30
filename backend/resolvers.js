const Transaction = require("./models/transaction.model");

module.exports = {
  data: async () => {
    const trans = await Transaction.find();
    console.log(trans);
    return trans;
  },
  oneData: async ({ tnx_id }) => {
    const trans = await Transaction.findOne({
      tnx_id,
    });
    console.log(trans);
    return trans;
  },
};
