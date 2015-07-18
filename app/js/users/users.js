'use strict';

module.exports = function(app) {
    require('../controllers/users_controller.js')(app);
    require('../services/user_stats.js')(app);
};
