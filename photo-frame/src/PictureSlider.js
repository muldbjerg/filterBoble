import React, { Component } from 'react';

let pictures,
    timePrSlide = 4000,
    picturePointer = 0,
    isFirst = true; 


class PictureSlider extends Component{

    componentWillReceiveProps(){
        pictures = this.props.pictures;
        picturePointer = 0;
        if(isFirst){
            if(pictures && pictures.length > 0){
                setTimeout(() => {
                    document.getElementById(picturePointer).style.opacity = 1;
                    isFirst = false;
                }, 20);
                this.slider();
            }
        }
    }

    slider(){
        if(pictures && pictures.length > 0){
            setTimeout(() => {
                if((picturePointer + 1) == pictures.length){
                    document.getElementById(picturePointer).style.opacity = 0;
                    picturePointer = 0;
                    document.getElementById(picturePointer).style.opacity = 1;
                }
                else{
                    document.getElementById(picturePointer).style.opacity = 0;
                    picturePointer += 1;
                    document.getElementById(picturePointer).style.opacity = 1;
                }
            
                this.slider();
            }, timePrSlide);
        };
    }  

    render(){

        if (!pictures) {
          return false;
        }

        return(
            <div>
               { Object.keys(pictures).map(function(key) {
                return (

                  <div key={key} id={key} className={"pictureSliderItem"} style={{backgroundImage: "url(" +pictures[key] + ")"}} >
                  </div>
                );
            })}
            </div>
        );
    }
}

export default PictureSlider; 