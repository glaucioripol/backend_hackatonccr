import { UserModel } from '../../models'
import { sendSmsToAuth } from '../../services/sms'
import { createToken } from '../../services/jwt'

export async function requestToAuth(req, res) {
  try {
    const { email } = req.body
    const checkIfExists = await UserModel.findOne({ email })

    if (!checkIfExists) {
      return res.status(404).json({ message: 'email não cadastrados' })
    }

    const { hash: last_token, status } = await sendSmsToAuth(checkIfExists.cellphone)

    if (status === 200) {
      const { _id, email, cellphone, gender } = checkIfExists
      await UserModel.updateOne({ _id }, { email, cellphone, gender, last_token })
    }

    return res.status(200).json({ message: 'será enviado uma mensagem para que você possa logar, :)' })
  } catch (error) {
    return res.status(502).json({ message: 'ocorreu uma falha, tente novamente' })
  }
}

export async function auth(req, res) {
  try {
    const { email, smsCode } = req.body

    const checkIfExists = await UserModel.findOne({ email, last_token: smsCode })

    if (!checkIfExists) {
      return res.status(404).json({ message: 'email/código não identificados, confirme os dados e tente novamente' })
    }

    const auth_token = createToken(checkIfExists._id)

    return res.json({ ...checkIfExists.sanitize(), auth_token })
  } catch (error) {
    return res.status(502).json({ message: 'ocorreu uma falha, tente novamente', error: String(error) })
  }
}
