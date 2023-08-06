"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileHandler = void 0;
const profileHandler = (req, res) => {
    const user = req.user;
    const profileResponse = {
        user,
        message: "Profile data",
    };
    res.status(200).json(profileResponse);
};
exports.profileHandler = profileHandler;
