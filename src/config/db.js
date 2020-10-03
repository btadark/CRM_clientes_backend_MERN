const mongoose = require('mongoose');


const conectarDB = async() => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('DB conectada');
  } catch (error) {
    console.log(error);
  }
}

module.exports = conectarDB;