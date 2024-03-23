function AdminFacultyAccess(req, res, next) {
  const currentRole = req.user?.role;

  if (currentRole !== 0 && currentRole !== 1) {
    // Allow both admin and faculty
    return res.status(403).json({ error: "You are not allowed to access" });
  }
  next();
}

module.exports = AdminFacultyAccess;