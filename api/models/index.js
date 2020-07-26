"use strict"

import User from "./user"
import Prefecture from "./prefecture"
import Occupation from "./occupation"

const models = {
  User,
  Occupation,
  Prefecture,
}

// import _ from 'underscore'
// import bluebird from 'bluebird'
// _.mapObject(models, function(val) {
//   bluebird.promisifyAll(val)
//   bluebird.promisifyAll(val.prototype)
// })

export default models
