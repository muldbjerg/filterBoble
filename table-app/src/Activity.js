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
                  <div key={key} className={"activityItem " + activities[key].Content }>
                    <div>{ activities[key].Firstname + " " + activities[key].ContentTekst }</div>
                    <div><span>. </span></div>
                  </div>
                );
            })}
          </div>
        );
    }
}
export default Activity;