import React, { Component } from 'react';
import moment from 'moment';

class Sidebar extends Component{
    
    // calculateAge(inputDate){
    //     let birthday = moment(inputDate, "MM/DD/YYYY");
    //     let now = new Date();

    //     return moment.duration(now - birthday).years();
    // }

    render(){
        return (
            <div id="sidebar">
                <img src={this.props.profileImgSrc} alt={ "Profilbillede af " + this.props.name } />
                <div id="profilImageOverlay"></div>

                <div id="sidebarInfo">
                    <label>INDE I BOBLEN ER</label>
                    <h2>{ this.props.name }</h2>
                    {/* <label>ALDER</label>
                    <h2>{ this.calculateAge(this.props.birthday) }</h2> */}
                </div>
                
            </div>
        );
    }
}
export default Sidebar;