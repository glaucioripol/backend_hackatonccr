import { model, Schema } from 'mongoose'

const schemaComment = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  }

})

const SchemaHasBathroom = new Schema({
  has: {
    type: Boolean,
    required: true,
    default: false
  },
  for_genders: {
    type: [String]
  }
})

const schemaPlaces = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price_range: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    has_shower: {
      type: Boolean,
      required: true
    },
    has_bathroom: [SchemaHasBathroom],
    comments: [schemaComment]
  },
  {
    timestamps: true
  }
)

// schemaPlaces.methods.sanitize = function () {
//   const { _id: id, email, cellphone, gender, createdAt, updatedAt } = this
//   return { id, email, cellphone, gender, createdAt, updatedAt }
// }

export const UserModel = model('PlacesToStop', schemaPlaces)
