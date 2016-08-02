const controllers = require('./controllers');
const auth = require('./libraries/authenticate');
const Router = require('express').Router;
const router = new Router();


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to API!' });
});

router.route('/user')
  .all(auth.verifyOrdinaryUser)
  .get(controllers.user.find.bind(controllers.user))
  .post(controllers.user.create.bind(controllers.user));

router.route('/user/:id')
  .all(auth.verifyOrdinaryUser)
  .put(controllers.user.update.bind(controllers.user))
  .get(controllers.user.findOne.bind(controllers.user))
  .delete(controllers.user.remove.bind(controllers.user));

router.route('/user/register')
  .post(controllers.user.register.bind(controllers.user))

router.route('/user/login')
  .post(controllers.user.login.bind(controllers.user))

router.route('/user/logout')
  .post(controllers.user.logout.bind(controllers.user))

router.route('/pet')
  .get(controllers.pet.find.bind(controllers.pet))
  .post(controllers.pet.create.bind(controllers.pet));

router.route('/pet/:id')
  .put(controllers.pet.update.bind(controllers.pet))
  .get(controllers.pet.findOne.bind(controllers.pet))
  .delete(controllers.pet.remove.bind(controllers.pet));


module.exports = router;
