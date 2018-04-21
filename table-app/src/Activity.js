import React, { Component } from 'react';

class Activity extends Component{


    render(){
        let activities = this.props.activities;
        
        if (!activities) {
          return false;
        }
    
        if (this.props.loading) {
          return (
            <div>
              Loading...
            </div>
          );
        }
    
        return (
          <div className="activities">
            { Object.keys(activities).map(function(key) {
                return (
                  <div key={key} className="activityItem">
                    <div>{ this.props.firstname + " " + activities[key].ContentTekst }</div>
                    <div>{ activities[key].Time }</div>
                  </div>
                );
            })}
          </div>
        );
    }
}
export default Activity;