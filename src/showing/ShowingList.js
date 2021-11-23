import React from "react";
import Showing from "./Showing";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from "axios";
import AddShowing from "./AddShowing";
import "../style.css"

class ShowingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

        this.addShowing = this.addShowing.bind(this)
    }

    addShowing(element) {

        this.setState((prevState) => {
            let list = prevState.list
            list.push(element)
            return { list: list }
        })
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
            list = 
            <div class="alertLayout center">
                <div class="alert alert-secondary" role="alert">Brak dostępnych seansów</div>
            </div>
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
                        render={() =>
                        <div>
                            <div class="row">
                                <div>
                                    {list}
                                </div>
                            </div>
                            <div class="row">
                                <div class="center padding">
                                    <Link class="btn btn-primary" to="/showing/add">Dodaj</Link>
                                </div>
                            </div>
                        </div>}
                    />
                    <Route
                        exact
                        path="/showing/add"
                        render={() => <AddShowing addShowing={this.addShowing}/>}/>
                </Router>
            </div>
        )
    }
}

export default ShowingList