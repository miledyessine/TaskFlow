const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Helper function to calculate end date
function calculateEndDate(startDate, duration) {
    const startDateObj = new Date(startDate);
    let endDateObj;

    switch(duration) {
        case '1week':
            endDateObj = new Date(startDateObj.setDate(startDateObj.getDate() + 7));
            break;
        case '2weeks':
            endDateObj = new Date(startDateObj.setDate(startDateObj.getDate() + 14));
            break;
        case '3weeks':
            endDateObj = new Date(startDateObj.setDate(startDateObj.getDate() + 21));
            break;
        case '4weeks':
            endDateObj = new Date(startDateObj.setDate(startDateObj.getDate() + 28));
            break;
        case 'custom':
        default:
            endDateObj = null;
            break;
    }

    return endDateObj;
}

const sprintSchema = new Schema({
    project_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String },
    duration: { 
        type: String, 
        required: true, 
        enum: ['1week', '2weeks', '3weeks', '4weeks', 'custom'],
    },
    start_date: { type: Date,default: Date.now, required: true },
    end_date: { type: Date },
});

// Pre-save hook to calculate end_date based on duration if needed
sprintSchema.pre('save', function(next) {
    if (this.duration !== 'custom' && this.start_date) {
        this.end_date = calculateEndDate(this.start_date, this.duration);
    }
    next();
});

const Sprint = mongoose.model('Sprint', sprintSchema);
module.exports = Sprint;
