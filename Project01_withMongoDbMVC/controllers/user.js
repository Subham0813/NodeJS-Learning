const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allDbUSers = await User.find({});
  res.json(allDbUSers);
};

const handleGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || null)
      res.status(404).json({ message: "user not found error" });

    return res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    //users can only change first_name, email, job_title and restricted to change other fields
    const user = await User.findById(req.params.id);
    const body = req.body;
    let changed = {};

    if (!user || null)
      return res.status(404).json({ status: error, message: "user not found" });

    if (body.first_name && body.first_name.length > 1) {
      user.first_name = body.first_name;
      changed = { ...changed, first_name: true };
    }

    if (body.job_title && body.job_title.length > 1) {
      user.job_title = body.job_title;
      changed = { ...changed, job_title: true };
    }

    //using regular expression(reg-ex) for better validation
    if (body.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      user.email = body.email;
      changed = { ...changed, email: true };
    }

    //the crucial part for save data in DB
    await user.save();

    return res.status(201).json({ message: "success", ...changed });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "user not found" });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  
  if (!body || !body.first_name || !body.email || !body.job_title) {
    return res
      .status(400)
      .json({ message: "first_name, email, job_title are required.." });
  }

  const result = await User.create({
    first_name: body.first_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
    ip_address: body.ip_address
  });
  console.log(result);
  return res.status(201).json({ message: "success" , id : result._id});
};
module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  handleCreateNewUser
};
