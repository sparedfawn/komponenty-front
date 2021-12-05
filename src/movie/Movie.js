import "../style.css";
import PropTypes, { func } from "prop-types"

const Movie = (props) => {

    return (
        <div class="layout padding">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p>Czas trwania: {props.duration} min</p>
                </div>
            </div> 
        </div>
    )
}

const x = (props,propName) =>{
    let prop = props[propName]
    if(prop.charAt(0) !== prop.charAt(0).toUpperCase()){
        return new Error("Nazwa filmu musi zaczynać się z dużej litery")
    }
    
    return null
    
}

Movie.propTypes = {
    title: (props,propName) =>{
        let prop = props[propName]
        if(typeof(prop)=='string'){
            if(prop == ""){
                return new Error("Nazwa jest wymagana")
            }
            if(prop.charAt(0) !== prop.charAt(0).toUpperCase()){
                return new Error("Nazwa filmu musi zaczynać się z dużej litery")
            }
        }else{
            return new Error("Wpisana nazwa musi być stringiem")
        }
        return null
        
    },
    duration: PropTypes.number.isRequired
   
}





export default Movie