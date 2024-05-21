function adminOnly(req, res, next) {
  return (req, res, next) => {
    try {
      if (req.user.role == "admin") {
        next();
        return;
      }

      throw new Error("Akses ditolak karena khusus admin!");
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  };
}

module.exports = adminOnly;
