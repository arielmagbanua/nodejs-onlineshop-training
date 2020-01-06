const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const user = req.session.user;

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    loggedUser: user
  });
};

exports.postLogin = (req, res, next) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  User.findOne({ 'email': userEmail, 'password': password })
    .then(user => {
      console.log(user);
      if (user) {
        req.session.user = user;
        return res.redirect('/');
      }
      
      res.redirect('/login');
    })
    .catch(error => {
      console.log(error);
      req.session.user = null;
      res.redirect('/login');
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(error => {
    res.redirect('/');
  });
};
