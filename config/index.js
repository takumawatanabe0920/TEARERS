let MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/"
let DB_NAME = "tears"
let MONGO_URL_DB = MONGO_URL + DB_NAME

if (!DB_NAME) {
  console.error("DB_NAME is not found.")
  process.exit(-1)
}

const config = {
  port: 8000,
  db: {
    url: MONGO_URL_DB,
  },
  // secret: {
  //   session: "tears-api-session"
  // }
}

export default config
