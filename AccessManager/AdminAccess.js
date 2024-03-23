function AdminAccess(req, res, next) {
  const currentRole = req.user?.role;

  if (currentRole !== 0) {
    return res.status(403).json({ error: "You are not allowed to access" });
  }
  next();
}

module.exports = AdminAccess;
