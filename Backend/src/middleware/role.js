module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role_id))
      return res.status(403).json({ error: 'Forbidden' });

    next();
  };
};
