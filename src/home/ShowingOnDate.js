import React from "react";
import axios from "axios";
import Showing from "../showing/Showing";

class ShowingOnDate extends React.Component {

    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
            list: [],
            date: date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate()
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

    dateOnChange = (event) => {
        let value = event.target.value
        this.setState({
            date: value
        })
    }

    render() {

        let list
        if (!this.state.list.length) {
            list =
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">Brak seansów danego dnia</div>
                </div>
        } else {
            list = this.state.list.filter(e => parseInt(e.date.substring(8,10)) === parseInt(this.state.date.substring(8,10)) &&
                parseInt(e.date.substring(0,4)) === parseInt(this.state.date.substring(0,4)) &&
                    parseInt(e.date.substring(5,7)) === parseInt(this.state.date.substring(5,7))).map(e =>
                <div>
                    <Showing date={e.date} movie={e.movie} room={e.room} takenSeats={e.takenSeats}/>
                </div>)
        }

        return <div>
            <div className="padding">
                <input type="datetime-local" className="form-control" value={this.state.date}
                       onChange={this.dateOnChange}/>

                {list}
            </div>

        </div>
    }
}

export default ShowingOnDate