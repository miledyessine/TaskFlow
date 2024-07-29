const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    typesOfTickets: {
        type: [String],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0;
            },
            message: 'There should be at least one type of ticket.'
        }
    },
    workflow: {
        type: [String],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length >= 2;
            },
            message: 'There should be at least two steps in the workflow.'
        }
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
