import React from "react";
import AddMovie from "./AddMovie";
import axios from "axios";
import Movie from "./Movie";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "../style.css";


class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7777/movie/all')
            .then(response => this.setState(state => {
                console.log(response.data)
                let list = response.data
                return { list: list }
            }))
            .catch(error => console.log(error))
    }

    addMovie = (movie) => {
        this.setState(state => {
            let list = state.list
            list.push(movie)
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
        }
        else {
            list = this.state.list.map(e => <div>
                <Movie title={e.title} duration={e.duration}/>
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
                        render={() => <AddMovie addMovie={this.addMovie}/>}/>
                </Router>
        )
    }
}

export default MovieList