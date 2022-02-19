const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, '*Campo obrigatório!']
  },
  phone: {
    type: Number
  }
});

const person = mongoose.model('person', PersonSchema);

module.exports = person