
import { Router } from 'express'
import { changeUserRole, getUsers } from '../controllers/adminController'
const router = Router()

router.post("/get/allusers", getUsers);
router.post("/user/change/role", changeUserRole);

export default router