import { UserModel } from '../../models'

export async function store(req, res) {
  try {
    const { email, cellphone, gender } = req.body

    const checkIfExists = await UserModel.findOne({ email })

    if (checkIfExists) {
      return res
        .status(404)
        .json({ message: 'email já cadastrados' })
    }

    const insertedUser = await UserModel.create({ email, cellphone, gender })

    return res.status(201).json({ ...insertedUser.sanitize() })
  } catch (error) {
    return res.json({ error })
  }
}
