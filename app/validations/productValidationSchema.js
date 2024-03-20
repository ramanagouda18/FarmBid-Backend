
const productCreateSchema = {
    productName:{
        exists:{
            errorMessage:'product Name is required'
        },
        notEmpty:{
            errorMessage:'product Name cannot be empty'
        }
    },
    // image:{
    //     exists:{
    //         errorMessage:'image is required'
    //     },
    //     notEmpty:{
    //         errorMessage:'image should be provided'
    //     },
        
    // },
    // video:{
    //     exists:{
    //         errorMessage:'video is required'
    //     },
    //     notEmpty:{
    //         errorMessage:'video should be provided'
    //     }
    // },
    basePrice:{
        exists:{
            errorMessage:'base price is required'
        },
        notEmpty:{
            errorMessage:'base price cannot be empty'
        },
        isNumeric:{
            errorMessage:'base price should be number'
        }
    },
    stock:{
        exists:{
            errorMessage:'stock is required'
        },
        notEmpty:{
            errorMessage:'stock cannot be empty'
        },
        isNumeric:{
            errorMessage:'stock should be valid number'
        }
    },
    address:{
        exists:{
            errorMessage:'address is required'
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        }
    }
}

module.exports = productCreateSchema