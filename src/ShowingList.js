import React from "react";
import Showing from "./Showing";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from "axios";
import AddShowing from "./AddShowing";

class ShowingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7777/showing/all')
            .then(response => this.setState(state => {
                console.log(response.data)
                let list = response.data
                return { list: list }
            }))
            .catch(error => console.log(error))
    }

    render() {
        let list
        if (!this.state.list.length) {
            list = <p>List is empty</p>
        }
        else {
            list = this.state.list.map(e => <div>
                <Showing date={e.date} movie={e.movie} room={e.room} takenSeats={e.takenSeats}/>
            </div>)
        }
        return (
            <div>
                <Router>
                    <Route
                        exact
                        path="/showing"
                        render={() => <div>
                            {list}
                            <Link to="/showing/add">Dodaj</Link>
                        </div>}/>
                    <Route
                        exact
                        path="/showing/add"
                        render={() => <AddShowing/>}/>
                </Router>
            </div>
        )
    }
}

export default ShowingList