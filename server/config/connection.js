const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://RKH1988:<123password>@nim-portal.nsvmufw.mongodb.net/?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

module.exports = mongoose.connection;