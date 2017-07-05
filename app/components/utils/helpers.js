// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var authKey = "9060b04f93d74976b6ae49a0e3af4d8c";

// Helper functions for making API Calls
var helper = {

  runQuery: function(location) {
    console.log("helpers.js runQuery");
    return "helpers.js runQuery";
    // var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=Fitzgerald&begin_date=20170101&end_date=20171231";
    // return axios.get(queryURL).then(function(response) {
    //   if (response.data.response.docs[0]) {
    //     return response.data.response.docs[0].formatted;
    //   }
    //   // If we don't get any results, return an empty string
    //   return "";
    // });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    console.log("helpers.js getHistory");
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    console.log("helpers.js postHistory");
    return "helpers.js postHistory";
    
    // return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;
