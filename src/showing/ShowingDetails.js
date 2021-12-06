import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Redirect} from "react-router";
import axios from "axios";

class ShowingDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: props.showing,
            index: props.index,
            redirect: false
        }
        this.deleteShowing = this.deleteShowing.bind(this)
        this.editShowing = this.editShowing.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    editShowing() {
        let func = this.props.editShowing
        func({
            date: this.state.showing.date,
            movie: this.state.showing.movie,
            room: this.state.showing.room,
            takenSeats: this.state.showing.takenSeats
        }, parseInt(this.props.index))
    }


    deleteShowing() {
        let func = this.props.deleteShowing
        func(this.state.index)
        this.setState({redirect:true})
    }

    handleChange(e) {
        let value = e.target.value
        console.log(value);
        this.state.showing.takenSeats.push(parseInt(value));
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to="/showing"/>
        }

        let emptySeats = [];

        for(let i = 0; i < this.state.showing.room.capacity; i++) {
            emptySeats[i] = i + 1;
        }
        emptySeats = emptySeats.filter(e => !this.state.showing.takenSeats.includes(e))
        emptySeats = emptySeats.map(e => <option value={e}>{e}</option>)
        console.log(this.state.showing.takenSeats);
        console.log(emptySeats);

        let date = this.state.showing.date;
        date = date.split("T");

        return (
                <div class="row paddingTop">
                    <div class="">
                        <div class="singleLayout">
                            <div class="card">
                                <div class="card-body center">
                                    <h5 class="card-title">{this.state.showing.movie.title}</h5>
                                    <h6 class="card-title">{date[0]}</h6>
                                    <p class="center">Sala: {this.state.showing.room.number}</p>
                                    <p class="center">Godzina: {date[1]}</p>
                                    <p class="center">Pozostałych miejsc: {parseInt(this.state.showing.room.capacity) - this.state.showing.takenSeats.length }</p>
                                    <Link to={"/showing/edit/" + parseInt(this.state.index)}>
                                        <button class="btn btn-outline-warning marginRight">Edytuj</button>
                                    </Link>
                                    <button class="btn btn-outline-danger" onClick={this.deleteShowing}>Usun</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="row paddingTop ">
                    <div class="center">
                    <div class="marginLeft singleLayout">
                        {this.state.showing !== Object && 
                        <div>
                            <p>Wybierz miejsce:</p>
                            <select class="form-select" onChange={this.handleChange}>
                                {emptySeats}
                            </select>
                            <Link to={"/showing/"} class="marginTop">
                                <button onClick={this.editShowing} class="btn btn-outline-success marginTop">Kup bilet</button>
                            </Link>
                        </div>
                        } 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default ShowingDetails