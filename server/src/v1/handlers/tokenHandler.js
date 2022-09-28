const JWT = require('jsonwebtoken');

// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    false;
  }
};

// JWT認証を検証するためのミドルウェア（トークン版ヴァリデーションチェック）
exports.verifyToken = (req, res, next) => {};
