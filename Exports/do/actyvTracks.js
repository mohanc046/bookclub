/**
 * 
 * Only single export from config file.
 * 
 * we can migrate to segment, firebase 
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
 
 export let ActyvTracks = actions;
 
 
 /**
  * 
  * single method => ActyvTracks
  * 
  * Straight forward method for tracking we have to export only ActyvTrack on each screen.
  * 
  * Incase we are moving from mixpanel to firebase or other tracking tools
  * 
  * - simple change in config file setup
  * 
  * 
  */









 /**
  * 
  * How to set up performance and user tracking in React with Google Analytics
  * 
  * Reference : https://www.freecodecamp.org/news/performance-and-user-tracking-in-react-with-google-analytics/
  * 
  * https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b
  * 
  * https://medium.com/geekculture/how-to-use-google-analytics-on-reactjs-in-5-minutes-7f6b43017ba9
  * 
  * Node most used packages - https://leanylabs.com/blog/npm-packages-for-nodejs/
  * 
  */