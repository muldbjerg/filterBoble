import {TweenMax} from "gsap";

const duration = 0.5;

export default{
    login(callback){
        console.log(this.title);
        return TweenMax.to(this.title, duration, {
            marginTop: 200,
            onComplete(){
                callback();
            }
        });
    }
}
