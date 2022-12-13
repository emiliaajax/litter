import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: [200, 'Email cannot exceed 200 characters.'],
    validate: [validator.isEmail, 'Invalid email.']
  },
  password: {
    type: String,
    minlength: [10, 'Password must be at least 10 characters long.'],
    maxlength: [200, 'Password length cannot exceed 200 characters.'],
    required: [true, 'Password required.']
  }
})

// Schema options.
schema.set('timestamps', true)
schema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v
    delete ret._id
  },
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Hash password if it is modified.
schema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

// User authentication.
schema.static('authenticate', async function (email, password) {
  try {
    const user = await this.findOne({ email })
    if (!user) throw new Error('Invalid credentials.')
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Invalid credentials.')
    return user
  } catch (error) {
    error.code = 401
    throw error
  }
})

const UserModel = mongoose.model('User', schema)

export default UserModel
