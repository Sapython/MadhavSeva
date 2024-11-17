// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
    createOrder: 'http://localhost:5001/iskcon-7feba/us-central1/createOrder',
    capturePayment: 'http://localhost:5001/iskcon-7feba/us-central1/capturePayments',
    createSubscription: 'http://localhost:5001/iskcon-7feba/us-central1/createSubscription',
    verifySubscription:'http://localhost:5001/iskcon-7feba/us-central1/verifySubscription',
    checkSubscriptionStatus:'http://localhost:5001/iskcon-7feba/us-central1/checkSubscriptionStatus',
  },
  RAZORPAY_KEY_ID: 'REPLACEMENT_STRING_8cTBlk022y2EDq',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
