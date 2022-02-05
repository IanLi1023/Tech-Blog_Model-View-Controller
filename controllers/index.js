const router = require('express').Router();

// const Routes = require('./routes');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
