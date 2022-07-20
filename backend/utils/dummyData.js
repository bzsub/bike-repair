const Shop = require("../models/shop")

const DummyData = async () => {
    const shops = await Shop.find();
    if( shops.length > 3) return "ola"
    let i = 0;
    while (i < 5){
        i++;
        await Shop.create({
            shopName: `shop ${i}`,
            email: `email ${i}`,
            phone: `phone ${i}`,
            locations: { 
                "zipCode": "1000" + i,
                "city": "Budapest" ,
                "street": "Móricz Zsigmond körtér",
                "streetNum": i,
            },
            prices: {
                "flatTire": i*100,
                "chainSwap": i*100,
                "wheelSwap": i*100,
            },
            bankInfo: { 
                "bankName": "OTP",
                "IBAN": i,
              },
        })
    }
}

module.exports = DummyData