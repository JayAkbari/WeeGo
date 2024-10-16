const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    if (!password) {
        return null;
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

exports.comparePassword = async (passwordString, hashedPassword) => {
    if (!passwordString && !hashedPassword) {
        return false;
    }

    return bcrypt.compareSync(passwordString, hashedPassword);
};
