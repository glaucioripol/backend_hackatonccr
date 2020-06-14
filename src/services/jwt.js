import jwt from 'jsonwebtoken'

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY_JWT)
}

export function checkToken(req, res, next) {
  const token = req.headers.bearer
  if (!token) return res.status(403).json({ auth: false, message: 'Unauthorized' })

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) return res.status(403).json({ auth: false, message: 'token expired or invalid' })

    req.user_id = decoded.id
    return next()
  })
}
