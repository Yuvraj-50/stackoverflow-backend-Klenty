const verifyUser = async (req, res) => {
  try {
    return res.status(200).json({ status: "ok", user: req.user });
  } catch (error) {
    return res.status(501).json({ err: error.message });
  }
};

module.exports = { verifyUser };
