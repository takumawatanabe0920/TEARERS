"use strict"

import mongoose from "mongoose"
import dayjs from "dayjs"
const Schema = mongoose.Schema

const PrefectureSchema = new mongoose.Schema({
  name: {
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

PrefectureSchema.methods.setPrefecture = function ({ name, number }) {
  if (name) this.name = name
  if (number) this.number = number
  this.updated_at()
}

PrefectureSchema.methods.createTimestamp = function () {
  this.created_date = dayjs().unix()
  this.updated_date = dayjs().unix()
}

PrefectureSchema.methods.updated_at = function () {
  this.updated_date = dayjs().unix()
}

export default mongoose.model("Prefecture", PrefectureSchema, "prefectures")
