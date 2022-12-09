import express from 'express';

import { create, getAll, getOne, update, deleteOne } from '../controllers/memo.js';
import { verifyToken } from '../middleware/tokenHandler.js';


const router = express.Router();

// create Memo
router.post('/', verifyToken, create);

// get all memos of login user
router.get('/', verifyToken, getAll)

// get one memo of login user
router.get('/:memoId', verifyToken, getOne);

// update one memo of login user
router.put('/:memoId', verifyToken, update);

// delete memo
router.delete('/:memoId', verifyToken, deleteOne)

export default router;