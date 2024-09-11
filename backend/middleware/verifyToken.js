const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];

  if (!tokenHeader) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  const token = tokenHeader.split(' ')[1]; 

  if (!token) {
    return res.status(403).send({ message: 'Invalid token format' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next(); 
  });
};

module.exports = verifyToken;
