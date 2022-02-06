const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const homeController = require('../controllers/homeController');
const dashboardController = require('../controllers/dashboardController');

router.use('/api', apiRoutes);
router.use('/', homeController);
router.use('/dashboard', dashboardController);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;