const { validationResult } = require('express-validator');

// next はミドルウェアを利用する際に必要
// validateという関数でこれを宣言する

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
