
import { Router } from 'express'
import { changeUserRole, deleteUser, getUsers } from '../controllers/adminController'
import { isAdminMiddleware } from '../middleware/authMiddleware';
const router = Router()

router.post("/get/allusers", isAdminMiddleware ,getUsers);
router.post("/user/change/role", isAdminMiddleware , changeUserRole);
router.post("/user/delete", isAdminMiddleware , deleteUser);

export default router