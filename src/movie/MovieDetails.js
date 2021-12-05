import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Redirect} from "react-router";
import axios from "axios";
import Movie from "./Movie";

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            index: props.index,
            redirect: false
        }
        this.deleteMovie = this.deleteMovie.bind(this)
    }


    deleteMovie = () => {          
        
        let func = this.props.deleteMovie
        func(this.state.index)
        
        this.setState({redirect:true})
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to="/movie"/>
        }


        return <div>
            <p>{this.state.movie.title}</p>
            <p>{this.state.movie.duration}</p>
            <Link to={"/movie/edit/" + parseInt(this.state.index)}>Edytuj</Link>
            <button onClick={this.deleteMovie}>Usun</button>
        </div>

    }
}

export default MovieDetails