import React from "react";
import AddMovie from "./AddMovie";
import Movie from "./Movie";

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
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
            list = <p>List is empty</p>
        }
        else {
            list = this.state.list.map(e => <div>
                <Movie title={e.title} time={e.time}/>
            </div>)
        }
        return (
            <div>
                {list}
                <AddMovie addMovie={this.addMovie}/>
            </div>
        )
    }
}

export default MovieList