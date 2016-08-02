const Controller = require('../libraries/controller');
const UserModel = require('../models/user-model');
const passport = require('passport');
const authenticate = require('../libraries/authenticate')

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class UserController extends Controller {

	register(req, res, next) {
		this.model.register(
			req.body.username,
			req.body.password,
			function (err, user) {
				if (err) {
					return res.status(500).json({ err: err });
				}
				user.save((err, user) => {
					passport.authenticate('local')(req, res, function () {
						return res.status(200).json({ status: 'Registration Successful!' });
					});
				})
			}
		)
	}

	login(req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({
					err: info
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return res.status(500).json({
						err: 'Could not log in user'
					});
				}

				var token = authenticate.getToken(user);
				res.status(200).json({
					status: 'Login successful!',
					success: true,
					token: token
				});
			});
		})(req, res, next);
	}

	logout(req, res, next) {
		req.logout();
		res.status(200).json({
			status: 'Bye!'
		});
	}

	// Example of overwriting update method using findOneAndUpdate from mongoose

	// update(req, res, next) {
	// 	this.model.findOneAndUpdate({ _id: req.params.id }, req.body)
	// 	.then(doc => {
	// 		if (!doc) res.status(404).send();
	// 		return res.status(200).json(doc);
	// 	})
	// 	.catch(err => next(err));
	// }

	// Example of a custom method. Remember that you can use this method
	// in a specific route in the router file

	// customMethod(req, res, next) {
	// 	this.model.geoNear([1,3], { maxDistance : 5, spherical : true })
	// 	.then(doc => {
	// 		if (!doc) res.status(404).send();
	// 		return res.status(200).json(doc);
	// 	})
	// 	.catch(err => next(err));
	// }
}

module.exports = new UserController(UserModel);
