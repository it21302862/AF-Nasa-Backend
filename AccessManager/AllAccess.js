function AllAccess(req, res, next) {
  const currentRole = req.user?.role;

  if (currentRole !== undefined && currentRole !== null) {
    next();
  } else {
    return res.status(403).json({ error: "You are not allowed to access" });
  }
}

module.exports = AllAccess;