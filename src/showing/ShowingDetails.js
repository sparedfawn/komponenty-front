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
        let func = this.props.deleteShowing
        func(this.state.index)
        this.setState({redirect:true})
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to="/showing"/>
        }


        return <div>
            <p>{this.state.showing.date}</p>
            <p>{this.state.showing.movie.title}</p>
            <p>{this.state.showing.movie.duration}</p>
            <p>{this.state.showing.room.number}</p>
            <p>{this.state.showing.room.capacity}</p>
            <p>{this.state.showing.takenSeats}</p>
            <Link to={"/showing/edit/" + parseInt(this.state.index)}>Edytuj</Link>
            <button onClick={this.deleteShowing}>Usun</button>
        </div>

    }
}

export default ShowingDetails