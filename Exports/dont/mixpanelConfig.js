/**
 * 
 * What happens if too many exports present for same functionality with different naming?
 * 
 * un-stable?
 * 
 * Why is this happening?
 * 
 * Some places using method_1 and in other screens using method_2
 * 
 * Naming conventions should be generic?
 * 
 * Side effect - need to overwrite existing usage & import methods
 * 
 * 
 */

import mixpanel from 'mixpanel-browser';

let actions = {

    // To initialize the mix-panel track
    init: (id) => {
        mixpanel.init(id);
    },

    // To identify each track belongs to which user
    identify: (id) => {
        mixpanel.identify(id);
    },

    // To track the actions / events belongs to different users
    track: (name, props) => {
        mixpanel.track(name, props);
    },

    // resetting mix-panel config while logging out
    reset: () => mixpanel.reset(),

    // can get the UNIQUE ID that has been assigned to the individual user
    getDistinctID: () => mixpanel.get_distinct_id()
};

export let Mixpanel = actions;


export const ActyvTracks = {

    // To identify each track belongs to which user
    identify: (id) => {
        Mixpanel.identify(id)
    },

    // To track the actions / events belongs to different users
    trackEvent: (name, props) => {
        Mixpanel.track(name, props);
    }
}

/**
 * 
 * method_1 => Mixpanel
 * 
 * method_2 => ActyvTracks
 * 
 * Inconsistency in code?
 * 
 * How to Prevent it?
 * 
 * 1. Restrict to only one export from config file.
 * 
 * Having methods in 2 different places and trying to use both at different places.
 * 
 * 
 */