var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://milk_dairy:amar@cluster0.2hpqs.mongodb.net/mini-project', { useNewUrlParser: true, useUnifiedTopology: true } );
var ForumSchema = new mongoose.Schema({
    id: Number,
    question: [{
        qnumber: Number,
        qtext: String,
        answers: [{
            ansno: Number,
            anstext: String
        }]
    }]

});


module.exports = mongoose.model("Forum", ForumSchema);

