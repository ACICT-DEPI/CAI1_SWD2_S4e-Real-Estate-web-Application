import express from 'express';
const router = express.Router();
import { getAllUsers,
    deleteUser,
    getUser} from '../../controller/usersController.js';
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), getUser);


    export default router;