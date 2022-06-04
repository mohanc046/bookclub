import firebaseAnalytics from 'firebase/app';

let actions = {

    // To initialize the mix-panel track
    init: (id) => {
        firebaseAnalytics.init(id);
    },

    // To identify each track belongs to which user
    identify: (id) => {
        firebaseAnalytics.identify(id);
    },

    // To track the actions / events belongs to different users
    track: (name, props) => {
        firebaseAnalytics.logEvent(name, props);
    },

    // resetting mix-panel config while logging out
    reset: () => firebaseAnalytics.reset(),

    // can get the UNIQUE ID that has been assigned to the individual user
    getDistinctID: () => firebaseAnalytics.get_distinct_id()
};

export let ActyvTracks = actions;