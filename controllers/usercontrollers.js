const User = require("../models/usersmodels");
const getNextSequence = require("../utils/autoIncrement")

// const userInsert = async (req, res) => {
//     const {name, age, address, phone, email, password} = req.body;
//     const user = await User.create({name, age, address, phone, email, password});
//     console.log(user);
//     res.status(201).json(user);
// }

const userInsert = async (req, res) => {
  try {
    const { name, age, address, phone, email, password } = req.body;

    // 1. Create and save the user (initial insert)
    const user = await User.create({
      name,
      age,
      address,
      phone,
      email,
      password,
    });

    // 2. Generate the IDs only after successful creation
    const { userId, customId } = await getNextSequence("userId", "USR");

    // 3. Assign and save the updated fields
    user.userId = userId;
    user.customId = customId;
    await user.save(); // important!

    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error inserting user:", error.message);
    res.status(500).json({ message: "Failed to insert user", error });
  }
};



const userRead = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}


// const userUpdate = async (req, res) => {
//     const {id} = req.params;
//     const {name, age, address, phone, email, password} = req.body;
//     const user = await User.findByIdAndUpdate(id, {name, age, address, phone, email, password});
//     res.status(200).json(user);
// }

const userUpdate = async (req, res) => {
  const { id } = req.params; // id = 5
  const { name, age, address, phone, email, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userId: id }, // 🔄 find by custom numeric userId
      { name, age, address, phone, email, password },
      { new: true }  // return the updated document
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};


const userDelete = async (req, res) => {
  const { id } = req.params; // this is the custom userId like 5

  try {
    // 🔍 Delete based on your custom userId field (Number)
    const user = await User.findOneAndDelete({ userId: id });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


const userReadById = async (req, res) => {
  const { id } = req.params;

  try {
    // Try both userId and customId
    const user = await User.findOne({           // findbyid() is only used to Read by MongoDB’s _id field only
      $or: [
        { userId: id }, 
        { customId: id }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load user", error });
  }
};


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



module.exports = {userInsert, userRead, userUpdate, userDelete, userReadById, userReadByEmail, userReadByPhone};