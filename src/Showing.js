import React from "react";
import Movie from "./Movie";
import Room from "./Room";

class Showing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            movie: props.movie,
            room: props.room,
            takenSeats: props.takenSeats
        }
    }

    render() {
        return (
            <div>
                <p>Data: {this.state.date.substr(0, this.state.date.indexOf('T'))}</p>
                <p>Godzina: {this.state.date.substr(this.state.date.indexOf('T') + 1, this.state.date.length)}</p>
                <p>Pozostalo biletow: {parseInt(this.state.room.capacity) - this.state.takenSeats.length }</p>
                <Movie title={this.state.movie.title} time={this.state.movie.duration}/>
                <Room num={this.state.room.number} capacity={this.state.room.capacity}/>
            </div>
        );
    }
}

export default Showing