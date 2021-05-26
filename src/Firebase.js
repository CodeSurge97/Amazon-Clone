import firebase from 'firebase'
// import * as functions from "firebase"


import {stripe} from "@stripe/react-stripe-js" 
// import Logging from '@google-cloud/logging'
// const logging = Logging(); 



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBMFhh8dT8Du4Me_i_iqaRrBYj52CFkOPY",
    authDomain: "clone-60e7b.firebaseapp.com",
    projectId: "clone-60e7b",
    storageBucket: "clone-60e7b.appspot.com",
    messagingSenderId: "661455756111",
    appId: "1:661455756111:web:bb251d097559987826033a",
    measurementId: "G-M3K7FNR1SE"
  });

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()
const Eprovider = new firebase.auth.EmailAuthProvider()


// const createStripeCharge = db
//   .doc('stripe_customers/{userId}/charges/{autoId}').onSnapshot(async ( snap, context) => {
//     const { amount, currency, payment_method } = snap.data();
//     try {
//       // Look up the Stripe customer id.
//       const customer = (await snap.ref.parent.parent.get()).data().customer_id;
//       // Create a charge using the pushId as the idempotency key
//       // to protect against double charges.
//       const idempotencyKey = context.params.pushId;
//       // const stripe = useStripe();
//       const payment = await stripe.paymentIntents.create(
//         {
//           amount,
//           currency,
//           customer,
//           payment_method,
//           off_session: false,
//           confirm: true,
//           confirmation_method: 'manual',
//         },
//         { idempotencyKey }
//       );
//       // If the result is successful, write it back to the database.
//       await snap.ref.set(payment);
//     } catch (error) {
//       // We want to capture errors and render them in a user-friendly way, while
//       // still logging an exception with StackDriver
//       firebase.functions.logger.log(error);
//       console.log(error.message)
//       // await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
//       // await reportError(error, { user: context.params.userId });
//     }
//   });

// // END CUSTOMER CHARGE //

// // When a user is created, register them with Stripe
// const createStripeCustomer = auth.user().onCreate(async (user) => {
//   // const stripe = useStripe();
//   const customer = await stripe.customers.create({email: user.email});
//   const intent = await stripe.setupIntents.create({
//     customer: customer.id,
//   });
//   return db.collection('stripe_customers').doc(user.uid).set({customer_id: customer.id,
//     setup_secret: intent.client_secret,});
// });

// // Add a payment source (card) for a user by writing a stripe payment source token to Cloud Firestore
// const addPaymentSource = db.doc('/stripe_customers/{userId}/tokens/{pushId}').onCreate(async (snap, context) => {
//   const source = snap.data();
//   const token = source.token;
//   if (source === null){
//     return null;
//   }

//   try {
//     const snapshot = await db.collection('stripe_customers').doc(context.params.userId).get();
//     const customer =  snapshot.data().customer_id;
//     // const stripe = useStripe();
//     const response = await stripe.customers.createSource(customer, {source: token});
//     return db.collection('stripe_customers').doc(context.params.userId).collection("sources").doc(response.fingerprint).set(response, {merge: true});
//   } catch (error) {
//     console.log(error.message)
//     // await snap.ref.set({'error':userFacingMessage(error)},{merge:true});
//     // return reportError(error, {user: context.params.userId});
//   }
// });

// // When a user deletes their account, clean up after them
// const cleanupUser = firebase.functions.auth.user().onDelete(async (user) => {
//   const snapshot = await db.collection('stripe_customers').doc(user.uid).get();
//   const customer = snapshot.data();
//   // const stripe = useStripe();
//   await stripe.customers.del(customer.customer_id);
//   return db.collection('stripe_customers').doc(user.uid).delete();
// });

// // function reportError(err, context = {}) {
// //   // This is the name of the StackDriver log stream that will receive the log
// //   // entry. This name can be any valid log stream name, but must contain "err"
// //   // in order for the error to be picked up by StackDriver Error Reporting.
// //   const logName = 'errors';
// //   const log = logging.log(logName);

// //   // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
// //   const metadata = {
// //     resource: {
// //       type: 'cloud_function',
// //       labels: { function_name: process.env.FUNCTION_NAME },
// //     },
// //   };

// //   // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
// //   const errorEvent = {
// //     message: err.stack,
// //     serviceContext: {
// //       service: process.env.FUNCTION_NAME,
// //       resourceType: 'cloud_function',
// //     },
// //     context: context,
// //   };

// //   // Write the error log entry
// //   return new Promise((resolve, reject) => {
// //     log.write(log.entry(metadata, errorEvent), (error) => {
// //       if (error) {
// //         return reject(error);
// //       }
// //       return resolve();
// //     });
// //   });
// // }

// // // [END reporterror]

// // /**
// //  * Sanitize the error message for the user.
// //  */
// // function userFacingMessage(error) {
// //   return error.type
// //     ? error.message
// //     : 'An error occurred, developers have been alerted';
// // }

// export { createStripeCharge, createStripeCustomer, addPaymentSource, cleanupUser, db, auth, provider, Eprovider} 
export {db, auth, provider, Eprovider} 