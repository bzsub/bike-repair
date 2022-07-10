const Shop = require("../models/shop")

const populateDummyData = () => {
    let i = 0;
    while (i < 10){
        i++;
        Shop.create({
            username: `shop ${i}`,
            prices: {
                "flatTire": i,
                "chainSwap": i,
                "wheelSwap": i,
            }
        })
    }
}

module.exports = populateDummyData