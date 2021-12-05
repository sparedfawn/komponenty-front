import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Redirect} from "react-router";
import axios from "axios";
import "../style.css";
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


    deleteMovie() {
        axios.delete('http://localhost:7777/movie/delete/' + this.props.index)
            .then(response => {
                if (response.status === 200) {
                    let func = this.props.deleteMovie
                    func(this.state.index)
                }
            })

        this.setState({redirect:true})
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to="/movie"/>
        }

        return (
            <div class="singleLayout padding">
                <div class="card center">
                    <div class="card-body">
                        <h5 class="card-title">{this.state.movie.title}</h5>
                        <p>Czas trwania: {this.state.movie.duration} min</p>
                        <Link to={"/movie/edit/" + parseInt(this.state.index)}>
                            <button class="btn btn-outline-warning marginRight">Edytuj</button>
                        </Link>
                        <button class="btn btn-outline-danger" onClick={this.deleteMovie}>Usun</button>
                    </div>
                </div> 
            </div>
        )
    }
}

export default MovieDetails