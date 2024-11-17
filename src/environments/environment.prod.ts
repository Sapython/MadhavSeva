export const environment = {
  firebase: {
    projectId: 'iskcon-7feba',
    appId: '1:84442133862:web:56cccd4b396ed7568004a7',
    storageBucket: 'iskcon-7feba.appspot.com',
    locationId: 'us-central',
    apiKey: 'REPLACEMENT_STRING',
    authDomain: 'iskcon-7feba.firebaseapp.com',
    messagingSenderId: '84442133862',
    measurementId: 'G-Y60YVWTFR4',
  },
  cloudFunctions : {
    createOrder: ' https://us-central1-iskcon-7feba.cloudfunctions.net/createOrder ',
    capturePayment: 'https://us-central1-iskcon-7feba.cloudfunctions.net/capturePayments',
    createSubscription: 'https://us-central1-iskcon-7feba.cloudfunctions.net/createSubscription',
    verifySubscription:'https://us-central1-iskcon-7feba.cloudfunctions.net/verifySubscription',
    checkSubscriptionStatus:'https://us-central1-iskcon-7feba.cloudfunctions.net/checkSubscriptionStatus',
  },
  RAZORPAY_KEY_ID: 'REPLACEMENT_STRING_8hEmHG2aEOtNa8',
  production: true
};
