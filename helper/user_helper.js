const validator = require('validator');
const models = require('../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const validate = require('uuid-validate');
const passwordValidator = require('password-validator');

const _ = require('underscore');
const db        = {};

//const User = require('../../../db/models/user');
const UPDATE_USERS_DETAILS_ATTRIBUTES =  ['name', 'sex', 'email', 'role'];




const createUserInDatabase = async (userParams) => {

    let uuid = uuidv4();
    let passwordValidate;


    userParams = _.pick(userParams, UPDATE_USERS_DETAILS_ATTRIBUTES);
    passwordValidate =   userParams.password.is().min(8)&& userParams.password.is().max(100) &&  userParams.password.has().uppercase() &&  userParams.password.has().lowercase() && userParams.password.has().digits()&& userParams.password.has().not().spaces();
    passwordEncrypted =md5(passwordValidate + uuid)
    try{
                let user = await models.User.create(userParams);

                if(user.validate()) {

                    return {
                        status: true,
                        message: 'Created Successfully',
                        args: {
                            user: user
                        }
                    }
                }
        } catch (e) {
            return {
                status: false,
                message: e.errors[0].message,
                args: {}
            }
        }

    };


module.exports.createUserInDatabase = createUserInDatabase;
