import { S3 } from 'aws-sdk'

export function upload(Key, Body) {
  return new S3().upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Body
  }).promise()
}

export function remove(Key) {
  return new S3().deleteObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key
  }).promise()
}

export function signInUrl(Key) {
  return new S3().getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Expires: 60 * 60 * 24
  })
}

// https://github.com/concretesolutions/cesta-basica/blob/master/backend/src/rules/receive.js - exemplo
// const timestamp = new Date()
// const [, ext] = receiveDonationFile.mimetype.split('/')
// const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`

// await S3.upload(key, receiveDonationFile.data)
