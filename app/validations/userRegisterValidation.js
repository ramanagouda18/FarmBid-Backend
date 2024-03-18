const User = require("../models/userModel")

const userRegisterValidation={
    username:{
        exists:{
            errorMessage:'username is required'
        },
        notEmpty:{
            errorMessage:'username is required'
        },
        trim:true,
        custom:{
            options:async function(value){
                const user=await User.findOne({username:value.toLowerCase()})
                if(user){
                    throw new Error('username is already taken')
                }
            }
        }
    },
    email:{
        exists:{
            errorMessage:'email is required'
        },
        notEmpty:{
            errorMessage:'email is required'
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:'email should be a valid format'
        },
        custom:{
            options:async function(value){
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error('email  already exists')
                }
            }
        }
    },
    phone:{
        exists:{
            errorMessage:'phone is required'
        },
        notEmpty:{
            errorMessage:'phone is required'
        },
        isNumeric:{
            errorMessage:'enter valid number'
        },
        isLength:{
            options:{min:10,max:10},
            errorMessage:'phone number should be 10 digits'
        },
        custom:{
            options:async function(value){
                const user=await User.findOne({phone:value})
                if(user){
                    throw new Error('phone number  already exists')
                }
            }
        }
    },
    password:{
        exists:{
            errorMessage:'password is required'
        },
        notEmpty:{
            errorMessage:'password is required'
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:'password  should be min 8 and max 128 characters'
        }

    },
    role:{
        exists:{
            errorMessage:'role is required'
        },
        notEmpty:{
            errorMessage:'role is required'
        },
        isIn:{
            options:[['seller','buyer']],
            errorMessage:'please select option from above'
        }
    }
}
const userLoginValidation={
    email:{
        trim:true,
        normalizeEmail:true,
        notEmpty:{
            errorMessage:'email is required'
        }       
    },
    password:{
        notEmpty:{
            errorMessage:'password is required'
        }
    }
}
module.exports={userRegisterValidation,userLoginValidation}