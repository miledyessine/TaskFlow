const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const backlogSchema = new Schema({
    project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    description: { type: String }
});

const Backlog = mongoose.model('Backlog', backlogSchema);
module.exports = Backlog;
