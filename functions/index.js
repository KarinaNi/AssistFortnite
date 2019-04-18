const functions = require('firebase-functions');
const admin = require('firebase-admin')
const fetch = require('node-fetch')
const _ = require('lodash')

admin.initializeApp()


// Updated daily at 7:01 PM using cron-job
exports.updateDailyStore = functions.https.onRequest((req, res) => {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/store/get')
    .then(res => res.json())
    .then(json => {
        return res.send(admin.firestore().collection('fortnite').doc('dailyStore').set(json))
    })
    .catch(error => console.log(error))
})

// Not updated daily
exports.updateWeaponStats = functions.https.onRequest((req, res) => {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/weapons/get')
    .then(res => res.json())
    .then(json => {
        return res.send(admin.firestore().collection('fortnite').doc('weapons').set(json))
    })
    .catch(error => console.log(error))
})

// Send push notif on update in data
exports.onStoreUpdate = functions.firestore
    .document('fortnite/dailyStore').onWrite((change, context) => {
        var before = change.before.data()
        var after = change.after.data()

        if (!_.isEqual(before, after)) {
            // Here is where you'd send the Push notif
            console.log('Detected change')
        }
        // Don't worry about this, this is to prevent an Unhandled promise rejection
        return change.after.ref.get();
    })