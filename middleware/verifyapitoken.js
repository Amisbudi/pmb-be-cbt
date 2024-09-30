require('dotenv').config();

const { API_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const key = req.headers['lp3i-api-key'];
  if (!key || key !== API_SECRET) {
    return res.status(403).json({
      message: 'Invalid API Key'
    });
  }
  next();
}