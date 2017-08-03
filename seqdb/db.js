var Sequelize = require('sequelize');

var sequelize = new Sequelize('users', 'sumit', '123', { dialect: 'mysql' });

var details = sequelize.define('users', {
    username: { type: Sequelize.STRING, required: true, unique: true },
    email: { type: Sequelize.STRING, required: true, unique: true },
    password: { type: Sequelize.STRING, required: true },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
});

var user_address = sequelize.define('address', {
    user_id: { type: Sequelize.STRING, required: true },
    address: Sequelize.JSON,
    phone_no: Sequelize.INTEGER
});

details.hasOne(user_address, { foreignKey: 'user_id' })

sequelize.sync().then((data) => {

})

module.exports = {
    user: details,
    address: user_address,
}