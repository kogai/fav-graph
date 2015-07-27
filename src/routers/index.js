"use babel";

import express from 'express';
import auth from 'routers/auth';

const router = express.Router();

router.get('/', function(req, res){
	res.send('ok');
});

router.get('/auth', auth.get);
router.post('/auth', auth.post);
router.delete('/auth', auth.del);
router.put('/auth', auth.put);

export default router;
