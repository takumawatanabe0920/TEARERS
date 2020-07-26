import express from "express"
import path from "path"
import config from "config"
import log4js from "log4js"
import connectDB from "./config/db"
import bodyParser from "body-parser"
const app = express()
const logger = log4js.getLogger()
const serverConfig = config.get("server")
import router from "./api/routes/v1"

app.use("/api/v1/", router)

// Connect Database
connectDB()

app.use(express.static(path.join("./", "dist")))

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(serverConfig.port, () => {
  logger.info(
    `server starting -> [port] ${serverConfig.port} [env] ${process.env.NODE_ENV}`
  )
})
