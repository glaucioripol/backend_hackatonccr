import jwt from 'jsonwebtoken'

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY_JWT)
}

function tokenIsValid(req, res, next) {
  return (err, decoded) => {
    if (err) return res.status(403).json({ message: 'token expired or invalid' })

    req.user_id = decoded.id
    return next()
  }
}

export function checkToken(req, res, next) {
  const { bearer } = req.headers

  if (!bearer) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  jwt.verify(bearer, process.env.SECRET_KEY_JWT, tokenIsValid(req, res, next))
}
