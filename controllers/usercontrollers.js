const User = require("../models/usersmodels");

const userInsert = async (req, res) => {
    const {name, age, address, phone, email, password} = req.body;
    const user = await User.create({name, age, address, phone, email, password});
    res.status(201).json(user);
}

const userRead = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}


const userUpdate = async (req, res) => {
    const {id} = req.params;
    const {name, age, address, phone, email, password} = req.body;
    const user = await User.findByIdAndUpdate(id, {name, age, address, phone, email, password});
    res.status(200).json(user);
}

const userDelete = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
}   

const userReadById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
}

const userReadByEmail = async (req, res) => {
    const {email} = req.params;
    const user = await User.findOne({email});
    res.status(200).json(user);
}

const userReadByPhone = async (req, res) => {
    const {phone} = req.params;
    const user = await User.findOne({phone});
    res.status(200).json(user);
}



module.exports = {userInsert, userRead, userUpdate, userDelete, userReadById, userReadByEmail};