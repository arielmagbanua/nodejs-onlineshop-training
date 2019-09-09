const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

// parse request body
app.use(bodyParser.urlencoded({extended: false}));

// set a static directory
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'})

sequelize.sync()
    .then((result) => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({
                name: 'Max',
                email: 'test@test.com'
            });
        }

        return user;
    })
    .then((user) => {
        // console.log(user);
        app.listen(9000);
    })
    .catch((error) => console.log(error));