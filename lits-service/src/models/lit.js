import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    trim: true,
    maxlength: [500, 'FIXA! Ska vara max 42 ord']
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Removes sensitive information by transforming the resulting object.
     *
     * @param {object} doc The mongoose document to be converted.
     * @param {object} ret The plain object response which has been converted.
     */
    transform: function (doc, ret) {
      delete ret.__v
      delete ret._id
    }
  },
  virtuals: true
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Creates a model using the schema.
export const Lit = mongoose.model('Lit', schema)
