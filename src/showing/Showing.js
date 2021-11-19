import React from "react";
import Movie from "../movie/Movie";
import Room from "../room/Room";

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
                <p>Data: {this.state.date.substr(0, this.state.date.indexOf('T'))}; 
                Godzina: {this.state.date.substr(this.state.date.indexOf('T') + 1, this.state.date.length)}; 
                Pozostalo biletow: {parseInt(this.state.room.capacity) - this.state.takenSeats.length }</p>
                <Movie title={this.state.movie.title} duration={this.state.movie.duration}/>
                <Room num={this.state.room.number} capacity={this.state.room.capacity}/>
            </div>
        );
    }
}

export default Showing