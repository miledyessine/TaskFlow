const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const taskSchema = new Schema({
    backlog_id: { type: Schema.Types.ObjectId },
    sprint_id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String },
    : { type: String, required: true },
    typeOfTicket: { type: String, required: true },
    priority: { type: Number, required: true },
    due_date: { type: Date },
    assignee_id: { type: Schema.Types.ObjectId }
}, {
    // Adding a custom validation method to ensure a task is either in a backlog or a sprint, but not both.
    validate: {
        validator: function() {
            return (this.backlog_id && !this.sprint_id) || (!this.backlog_id && this.sprint_id);
        },
        message: "A task must be assigned to either a backlog or a sprint, but not both."
    }
});

const Task = mongoose.model("Task", taskSchema);

// Subtasks Schema
const subtaskSchema = new Schema({
    task_id: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    typeOfTicket: { type: String, required: true },
    priority: { type: Number, required: true },
    due_date: { type: Date },
    assignee_id: { type: Schema.Types.ObjectId }
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = {Task, Subtask};
