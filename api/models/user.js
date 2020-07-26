"use strict"

import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import dayjs from "dayjs"
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_image: {
    type: Array,
    default: [],
  },
  address_prefecture_id: {
    type: Schema.Types.ObjectId,
    ref: "Prefecture",
    // required: true
    default: null,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation_id: {
    type: Schema.Types.ObjectId,
    ref: "Occupation",
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  device_token: {
    type: String,
    unique: true,
    sparse: true,
  },
  reset_password_token: {
    type: String,
  },
  reset_password_expires: {
    type: Date,
  },
  created_date: {
    type: Number,
    required: true,
  },
  updated_date: {
    type: Number,
    required: true,
  },
  logged_in_date: {
    type: Number,
  },
})

UserSchema.methods.signUp = function (params) {
  this.setUser(params)
  let { password } = params
  if (!password) throw new Error("Failed: No password")

  this.setHash(password)
  this.status = true
  this.updated_at()
}

UserSchema.methods.setUser = function ({
  email,
  name,
  address_prefecture_id,
  gender,
  occupation_id,
  status,
  description,
}) {
  if (email) this.email = email
  if (typeof name != "undefined") this.name = name
  if (typeof address_prefecture_id != "undefined")
    this.address_prefecture_id = address_prefecture_id
      ? address_prefecture_id
      : null
  if (typeof description != "undefined") this.description = description
  if (typeof gender != "undefined") this.gender = gender
  if (typeof occupation_id != "undefined")
    occupation_id
      ? (this.occupation_id = occupation_id)
      : (this.occupation_id = null)
  if (typeof status != "undefined") this.status = status

  this.updated_at()
}

UserSchema.methods.createTimestamp = function () {
  this.created_date = dayjs().unix()
  this.updated_date = dayjs().unix()
  this.logged_in_date = dayjs().unix()
}

UserSchema.methods.updated_at = function () {
  this.updated_date = dayjs().unix()
}

// UserSchema.methods.logged_in_at = function () {
//   this.logged_in_date = dayjs().unix()
// }

UserSchema.methods.setHash = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), 10)
}

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.setRefreshToken = function () {
  this.reset_password_token = crypto.randomBytes(8).toString("hex")

  let dt = new Date()
  dt.setHours(dt.getHours() + 3)
  this.reset_password_expires = dt.getTime() // 3hours
}

UserSchema.methods.resetPassword = function (currentPassword, newPassword) {
  if (!this.comparePassword(currentPassword)) throw new Error(404)
  this.setHash(newPassword)
}

UserSchema.methods.checkExpire = function () {
  if (!this.reset_password_expires) throw new Error(404)
  const d1 = this.reset_password_expires.getTime()
  const d2 = new Date().getTime()
  const diff = d1 > d2
  return diff
}

export default mongoose.model("User", UserSchema, "users")
