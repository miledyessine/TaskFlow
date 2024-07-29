const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, required: true, unique: true, private: true },
    username: { type: String, required: true, unique: true, private: true },

    email: { type: String, required: true, unique: true },
    roles: {
        type: [{ type: String, enum: ["admin", "team_leader", "team_member"] }],
        default: ["team_member"],
    },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
