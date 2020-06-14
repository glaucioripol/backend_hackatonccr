import crypto from 'crypto'
import axios from 'axios'

function configRequest(numberToSend, hash) {
  const payload = {
    message: `numero para entrar no app vida na estrada - ${hash}`,
    message_type: 'promotional',
    subject: [numberToSend],
    subject_type: 'number'
  }

  const headers = {
    authorization: process.env.KEY_API_SMS
  }

  return { payload, headers }
}

export async function sendSmsToAuth(numberToSend) {
  const hash = crypto.randomBytes(6).toString('hex')

  const { payload, headers } = configRequest(numberToSend, hash)
  const { URL_API_SMS } = process.env

  try {
    const { status } = await axios.post(URL_API_SMS, payload, { headers })
    console.log(status)
    return { hash, status }
  } catch (error) {
    const { status, data } = error.response
    console.log(status, ' - ', data)
    return { hash, status }
  }
}
