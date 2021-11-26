import React from "react";
import axios from "axios";
import Showing from "../showing/Showing";
import {Link} from "react-router-dom";

class CurrentShowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            date: new Date()
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7777/showing/all')
            .then(response => this.setState(state => {
                let list = response.data
                return {list: list}
            }))
            .catch(error => console.log(error))
    }

    render() {
        let list
        if (!this.state.list.length) {
            list =
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">Brak seansów trwajacych aktualnie</div>
                </div>
        } else {
            list = this.state.list.filter(e => parseInt(e.date.substring(8, 10)) === this.state.date.getDate() &&
                parseInt(e.date.substring(0, 4)) === this.state.date.getFullYear() &&
                parseInt(e.date.substring(5, 7)) === (this.state.date.getMonth() + 1) &&
                parseInt(e.date.substring(11, 13)) * 60 + parseInt(e.date.substring(14, 16)) <= this.state.date.getHours() * 60 + this.state.date.getMinutes() &&
                parseInt(e.date.substring(11, 13)) * 60 + parseInt(e.date.substring(14, 16)) + parseInt(e.movie.duration) >= this.state.date.getHours() * 60 + this.state.date.getMinutes()
            ).map(e =>
                <div>
                    <Showing date={e.date} movie={e.movie} room={e.room} takenSeats={e.takenSeats}/>
                </div>)
        }

        return <div>
            <div className="padding">
                {list}
            </div>
        </div>
    }
}

export default CurrentShowing