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
    }


    deleteShowing() {
        axios.delete('http://localhost:7777/showing/delete/' + this.props.index)
            .then(response => {
                if (response.status === 200) {
                    let func = this.props.deleteShowing
                    func(this.state.index)
                }
            })

        this.setState({redirect:true})
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to="/showing"/>
        }

        let date = this.state.showing.date;
        date = date.split("T");

        return (
            <div class="singleLayout padding">
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
            
        )
    }
}

export default ShowingDetails