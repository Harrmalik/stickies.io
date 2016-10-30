var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var noteSchema = new Schema({
    text: String,
    board: String,
    color: String,
    dateCreated: { type: Date, default: Date.now}
});

noteSchema.plugin(findOrCreate);
mongoose.model('Note', noteSchema);
