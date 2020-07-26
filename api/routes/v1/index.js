"use strict"

import { Router } from "express"
import users from "./users"

const router = Router()

/**
 * Routing.
 */
router.use("/users", users)

export default router
