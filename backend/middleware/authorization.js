const {pool} = require('../models/db'); 

const authorization = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const roleId = req.token.role;
      console.log(req.token);
console.log(roleId);
      const result = await pool.query(
        `SELECT p.permission_name FROM permissions p
         INNER JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = $1`,
        [roleId]
      );
console.log(result.rows);
      const permissions = result.rows.map(row => row.permission_name);
      if (permissions.includes(requiredPermission)) {
        return next();
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        err: err.stack,
      });
    }
  };
};

module.exports = authorization;
