const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");


const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return User.create(userBody);
};

const queryUsers = async () => {
    const users = await User.find();
    return users;
};

const getUserById = async (id) => {
    return User.findById(id);
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (
        updateBody.email &&
        (await User.isEmailTaken(updateBody.email, userId))
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await user.deleteOne();
    return user;
};

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
