import React from "react";
import AddMovie from "./AddMovie";
import axios from "axios";
import Movie from "./Movie";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "../style.css";
import MovieDetails from "./MovieDetails";
import EditMovie from "./EditMovie";
import * as Api from "../api"


class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

        this.addMovie = this.addMovie.bind(this)
        this.editMovie = this.editMovie.bind(this)
        this.deleteMovie = this.deleteMovie.bind(this)
    }

    componentDidMount() {
        Api.getMovies().then(response => this.setState(state => {
            let list = response.data
            return { list: list }
        }))
            .catch(error => console.log(error))
    }

    addMovie = (movie) => {
        Api.addMovie(movie).then(() => {
            this.setState(state => {
                let list = state.list
                list.push(movie)
                return { list: list }
            })
        })

    }

    editMovie(element, index) {
        Api.editMovie(element,index).then(() =>{
            this.setState((prevState) => {
                let list = prevState.list
                list[index] = element
                return { list: list }
            })
        }) 
    }

    deleteMovie(index) {

        this.setState((prevState) => {
            let list = prevState.list
            list.splice(index, 1)
            return { list: list }
        })
    }

    render() {
        let list
        if (!this.state.list.length) {
            list =
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">Brak dodanych filmów</div>
                </div>
        } else {
            list = this.state.list.map(e => <div>
                <Link to={"/movie/details/" + Array.prototype.indexOf.call(this.state.list, e)}>
                    <Movie title={e.title} duration={e.duration} />
                </Link>
            </div>)
        }
        return (
            
            <Router>
                <Route
                    exact
                    path="/movie"
                    render={() =>
                        <div>
                            <div class="row">
                                <div>
                                    {list}
                                </div>
                            </div>
                            <div class="row">
                                <div class="center padding">
                                    <Link class="btn btn-primary" to="/movie/add">Dodaj</Link>
                                </div>
                            </div>
                        </div>}
                />
                <Route
                    exact
                    path="/movie/add"
                    render={() => <AddMovie addMovie={this.addMovie} />} />
                <Route
                    exact
                    path="/movie/details/:id"
                    render={({ match }) =>
                        <MovieDetails movie={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                            deleteMovie={this.deleteMovie} />} />
                <Route
                    exact
                    path="/movie/edit/:id"
                    render={({ match }) =>
                        <EditMovie movie={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                            editMovie={this.editMovie} />} />
            </Router>
        )
    }
}

export default MovieList