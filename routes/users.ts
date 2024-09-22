import express from 'express';
const router = express.Router();
import auth from "../middlewares/auth";

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
