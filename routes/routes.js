//routes.js
//initialize express router
let router = require('express').Router();
//set default API response

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "access-token, Origin, Content-Type, Accept"
    );
    next();
  });
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});
//Import User Controller
var userController = require('../controllers/userController');


// Add User Data
router.route('/user')
    .get(userController.index)
    .post(userController.add);


// GET/EDIT/DELETE USER DATA    
router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);


// ADD WORKING HOURS FOR USER
router.route('/user/addWork/:user_id')
    .put(userController.addWork)


//ADD BLOCKED APPS AND LIMITED APPS FOR USER 
router.route('/user/addApp/:user_id')
    .put(userController.addApp)

//REMOVE BLOCKED and LIMITED APPS FOR USER
router.route('/user/removeApp/:user_id')
    .put(userController.removeApp)

//ADD LIMITED APPS ALONE FOR USER
router.route('/user/addLimited/:user_id')
    .put(userController.addLimited)

//EDIT LIMITED APPS ALONE FOR USER    
router.route('/user/editLimited/:user_id')
    .put(userController.limitedApTime)




//Export API routes
module.exports = router;