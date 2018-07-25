const models = require('../db/models/index');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const ValidatePassword =  require('validate-password');
const referral_codes = require('voucher-code-generator');


const _ = require('underscore');
const db        = {};

//const User = require('../../../db/models/user');
const UPDATE_USERS_DETAILS_ATTRIBUTES =  ['name', 'sex', 'email', 'role', 'referralCode', 'promoCode'];
const REFERAL_CODE =['referralCode'];



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
    let generateCode= referral_codes.generate({
        length: 5,
        count: 1
    });
    const validator = new ValidatePassword(options);
    const passwordData = validator.checkPassword(userParams.password);
    encryptedPassword = md5(passwordData+uuid);
    if (passwordData.isValid ==false) return { status: false, message: passwordData.validationMessage};
   // const referalCode = userParams.referralCode


    try {
        userParams = _.pick(userParams, UPDATE_USERS_DETAILS_ATTRIBUTES);
        userParams.referralCode = generateCode[0];
        const refUser = await models.User.findOne({
            where: {
                referralCode: userParams.promoCode
            },
        })

        let user = new models.User(userParams);
        if (user.validate()) {
            if (userParams.promoCode == "" ) {
                await user.save();
                return {
                    status: true,
                    message: 'User Created Successfully without promo code',
                    args: {
                        user: user
                    }
                }
            }

            else if (userParams.promoCode != null && userParams.promoCode.trim().length > 0 && refUser != null) {
                await user.save();
                return {
                    status: true,
                    message: 'User Created Successfully with promo code ,so you will get 20 % off',
                    args: {
                        user: user
                    }
                }
            }

            else
             {
                //await user.save();
                return {
                    status: true,
                    message: ' you have entered wrong promo code. Either enter correct referal code or leave it blank',
                    args: {
                        user: user
                    }
                }
            }
        }

        else {
            return {message: 'invalid promo code'}
        }

    }
     catch (e) {
        return {
            status: false,
            message: e.errors[0].message
        }
    }

}
module.exports.createUserInDatabase = createUserInDatabase;
