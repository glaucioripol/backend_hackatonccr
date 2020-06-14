import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    cellphone: {
      type: String,
      required: true,
      unique: true
    },
    last_token: {
      type: String
    },
    gender: {
      type: String,
      // enum: ['masculino, feminino'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

schema.methods.sanitize = function () {
  const { _id: id, email, cellphone, createdAt, updatedAt } = this
  return { id, email, cellphone, createdAt, updatedAt }
}

export const UserModel = model('User', schema)
