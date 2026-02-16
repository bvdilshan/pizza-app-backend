const crypto = require('crypto');

const generateHash = (orderId, amount, currency) => {
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_SECRET;

    const hashedSecret = crypto.createHash('md5')
        .update(merchantSecret)
        .digest('hex')
        .toUpperCase();


    const formattedAmount = parseFloat(amount).toFixed(2);

    const authString = merchantId + orderId + formattedAmount + currency + hashedSecret;

    return crypto.createHash('md5')
        .update(authString)
        .digest('hex')
        .toUpperCase();
};

module.exports = generateHash;
