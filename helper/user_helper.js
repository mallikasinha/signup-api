const validator = require('validator');
const models = require('../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const validate = require('uuid-validate');
const ValidatePassword =  require('validate-password');

const _ = require('underscore');
const db        = {};

//const User = require('../../../db/models/user');
const UPDATE_USERS_DETAILS_ATTRIBUTES =  ['name', 'sex', 'email', 'role'];



const createUserInDatabase = async (userParams) => {

    let uuid = uuidv4();


    const options = {
        enforce: {
            lowercase: true,
            uppercase: true,
            specialCharacters: false,
            numbers: true
        }
    };

    const validator = new ValidatePassword(options);
    const passwordData = validator.checkPassword(userParams.password);
    encryptedPassword = md5(passwordData+uuid);
    if (passwordData.isValid ==false) return { status: false, message: passwordData.validationMessage};
    encryptedPassword = md5(passwordData+uuid);

    try {
        userParams = _.pick(userParams, UPDATE_USERS_DETAILS_ATTRIBUTES);

        let user = await models.User.create(userParams);
        if (user.validate()) {

            return {
                status: true,
                message: 'User Created Successfully',
                args: {
                    user: user
                }
            }
        }
    } catch (e) {
        return {
            status: false,
            message: e.errors[0].message
        }


    }

}
module.exports.createUserInDatabase = createUserInDatabase;
