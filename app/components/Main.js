// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      if (response !== this.state.history) {
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.searchTerm).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    // this.setState({ searchTerm: term });
    this.setState({ searchTerm: "Fitzgerald" });

  },
  // Here we render the function
  render: function() {
    return (
        <div className="container">
           <div className="jumbotron">
              <h1>New York Times Search</h1>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Form setTerm={this.setTerm} />
              </div>
            </div>
            <div className="row">
              {/* results panel */}
              <div className="col-lg-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Search Results</h3>
                  </div>
                  <div className="panel-body" id="well-section">

                  </div>
                </div>
              </div>
            </div>

        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
