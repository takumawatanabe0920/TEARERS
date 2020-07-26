"use strict"

import mongoose from "mongoose"
import dayjs from "dayjs"
const Schema = mongoose.Schema

const OccupationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Number,
    required: true,
  },
  updated_date: {
    type: Number,
    required: true,
  },
})

OccupationSchema.methods.setOccupation = function ({ title, number }) {
  if (title) this.title = title
  if (number) this.number = number
  this.updated_at()
}

OccupationSchema.methods.createTimestamp = function () {
  this.created_date = dayjs().unix()
  this.updated_date = dayjs().unix()
}

OccupationSchema.methods.updated_at = function () {
  this.updated_date = dayjs().unix()
}

export default mongoose.model("Occupation", OccupationSchema, "occupations")
