const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia123'; // sesuaikan dengan key di login

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ message: 'Token tidak ada' });

  const token = authHeader.split(' ')[1]; // 'Bearer <token>'
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id; // simpan userId dari token
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
}

module.exports = authMiddleware;
