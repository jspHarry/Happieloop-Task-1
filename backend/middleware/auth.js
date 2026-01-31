// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('--- auth middleware ---');
    console.log('Request path:', req.originalUrl);
    // raw cookie header (useful if cookie-parser not parsing)
    console.log('req.headers.cookie (raw):', req.headers && req.headers.cookie);
    // parsed cookies (if cookie-parser used)
    console.log('req.cookies (parsed):', req.cookies);
    console.log('Authorization header:', req.header('Authorization'));

    // cookie first, then Authorization header
    const tokenFromCookie = req.cookies && (req.cookies.token || req.cookies['token']);
    const authHeader = req.header('Authorization') || '';
    const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      console.log('No token found in cookie or Authorization header.');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log('Token verify error:', err && err.message);
      // show part of token for debug (do NOT print in production)
      try { console.log('First 100 chars of token:', token.slice(0,100)); } catch(e){}
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // show decoded token in logs (handy while debugging; remove in prod)
    console.log('Decoded token payload:', decoded);

    // tolerate common id property names
    const userId = decoded.id || decoded.userId || decoded.user_id || decoded.sub;
    const email = decoded.email || decoded.mail || decoded.em;

    if (!userId) {
      console.log('Token decoded but no user id found in payload.');
      // still attach the decoded object so routes can decide, but typically reject
      return res.status(401).json({ message: 'Token payload missing user id' });
    }

    req.user = { id: userId, email };
    return next();
  } catch (err) {
    console.error('Auth middleware unexpected error:', err);
    return res.status(500).json({ message: 'Server error in auth' });
  }
};
