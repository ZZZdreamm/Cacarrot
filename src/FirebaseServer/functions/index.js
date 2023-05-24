/**
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
// exports.logged = functions.https.

exports.echoData = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const requestData = request.body;
    console.log("Received data:", requestData);

    // Process the data or perform any desired operations

    const responseData = {
      message: "Data received successfully",
      data: 'I have sended data so check it out',
    };
    // response.json(responseData);
    response.emit()
    response.send(responseData)
  });
});


// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.sendMessage = functions.firestore
//   .document('messages/{messageId}')
//   .onCreate((snapshot, context) => {
//     const messageData = snapshot.data();
//     const recipientUserId = messageData.recipientUserId;
//     const dataToSend = {
//       message: messageData.message,
//       senderUserId: messageData.senderUserId,
//     };

//     // Send data to the recipient user
//     const recipientUserRef = admin.firestore().collection('users').doc(recipientUserId);
//     return recipientUserRef.collection('receivedMessages').add(dataToSend);
//   });