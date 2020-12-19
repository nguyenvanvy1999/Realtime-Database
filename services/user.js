const { response } = require("express");
const User = require("./../models/user");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("./../middleware/bcrypt");
const jwtHelper = require("../helpers/jwt");
const jwt = require("../helpers/jwt");
const config = require("../config");

// ________________________________________________
function newUser(email, username, password) {
    newUser = {
        _id: mongoose.Types.ObjectId(),
        email: email,
        username: username,
        password: password,
    };
    return newUser;
}

function insert(newUser) {
    return new Promise((resolve, reject) => {
        try {
            const user = new User(newUser);
            const result = user.save();
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        try {
            const user = User.findOne({ email: email });
            return resolve(user);
        } catch (error) {
            return reject(error);
        }
    });
}

function getAllUser() {
    return new Promise((resolve, reject) => {
        try {
            const userDocuments = User.find();
            return resolve(userDocuments);
        } catch (error) {
            return reject(error);
        }
    });
}

function editUser(email, newUsername, newPassword) {
    return new Promise((resolve, reject) => {
        try {
            console.log(newPassword);
            const user = User.findOneAndUpdate({ email: email }, { username: newUsername, password: newPassword }, { new: true });
            return resolve(user);
        } catch (error) {
            return reject(error);
        }
    });
}

function deleteUserByEmail(email) {
    return new Promise((resolve, reject) => {
        try {
            const result = User.findOneAndDelete({ email: email });
            return resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

// ________________________________________________
module.exports = {
    newUser: newUser,
    insert: insert,
    getUserByEmail: getUserByEmail,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUserByEmail: deleteUserByEmail,
};