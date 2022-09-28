const { body, validationResult } = require('express-validator');
const router = require('express').Router();
require('dotenv').config();

const User = require('../models/user');
const validation = require('../handlers/validation');
const userController = require('../controllers/user');
const tokenHandler = require('../handlers/tokenHandler');

// ユーザー新規登録API
router.post(
  '/register',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('確認用パスワードは8文字以上である必要があります'),
  body('username').custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('このユーザーはすでに使われています');
      }
    });
  }),

  validation.validate,
  userController.register
);

// ログイン用API
router.post(
  // login : エンドポイント
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります'),
  validation.validate,
  userController.login
);

// JWT認証API
// JWT認証の手前にミドルウェアを設定して、これが正常に通ったら200が通るようにする
router.post('/verfiy-token', tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
