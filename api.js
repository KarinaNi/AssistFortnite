

export function getDailyStore() {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/store/get')
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}

export function getUserStats(platform,username) {
    return fetch('https://api.fortnitetracker.com/v1/profile/'+platform+'/'+username,
            {headers: {'TRN-Api-Key': 'adf86c89-6413-4544-a992-4bdde12b3d02'}})
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}

export function getChallenges(season) {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/challenges/get?season='+season)
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}

export function getUpcomingItems() {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get')
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}

export function getWeapons() {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/weapons/get')
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}

export function getServerStatus() {
    return fetch('https://fortnite-public-api.theapinetwork.com/prod09/status/fortnite_server_status')
        .then((response) => {
            return response.json()})
        .catch((error) => {
        console.error(error);
        });
}