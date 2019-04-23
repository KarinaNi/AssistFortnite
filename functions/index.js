const functions = require('firebase-functions');
const admin = require('firebase-admin')
const fetch = require('node-fetch')

admin.initializeApp()

// Updated daily at 7:01 PM using cron-job
exports.updateDailyStore = functions.https.onRequest((req, res) => {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/store/get')
    .then(res => res.json())
    .then(json => {
        admin.firestore().collection('fortnite').doc('dailyStore').set(json).then(() => {
            res.send('OK')
        })
    })
    .catch(error => console.log(error))
})

// Not updated daily
exports.updateWeaponStats = functions.https.onRequest((req, res) => {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/weapons/get')
    .then(res => res.json())
    .then(json => {
       admin.firestore().collection('fortnite').doc('weapons').set(json).then(() => {
            res.send('OK')
       })
    })
    .catch(error => console.log(error))
})

// Send push notif on update in data
exports.onStoreUpdate = functions.firestore
    .document('fortnite/dailyStore').onWrite((change, context) => {

        const { Expo } = require('expo-server-sdk')
        let expo = new Expo()

        let messages = []
        return admin.firestore().collection('fortnite').doc('users').get()
        .then((doc) => {
            for (const key in doc.data()) {
                let pushToken = doc.data()[key]
                if (!Expo.isExpoPushToken(pushToken)) {
                    console.error(`Push token ${pushToken} is not a valid Expo push token`);
                    continue;
                }
                messages.push({
                    to: pushToken,
                    title: 'Item Shop Updated!',
                    sound: 'default',
                    body: 'Come check out the freshly updated Item Shop!',
                })
            }
            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            async function pushToExpo() {
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                    } catch (error) {
                    console.error(error);
                    }
                }
            }
            return pushToExpo()
        })
        .catch((error) => {
            console.error(error)
        })
    })