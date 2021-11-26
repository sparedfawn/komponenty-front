import React from "react";
import Showing from "./Showing";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from "axios";
import AddShowing from "./AddShowing";
import "../style.css"
import EditShowing from "./EditShowing";
import ShowingDetails from "./ShowingDetails";

class ShowingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

        this.addShowing = this.addShowing.bind(this)
        this.editShowing = this.editShowing.bind(this)
        this.deleteShowing = this.deleteShowing.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:7777/showing/all')
            .then(response => this.setState(state => {
                let list = response.data
                return {list: list}
            }))
            .catch(error => console.log(error))
    }

    addShowing(element) {

        this.setState((prevState) => {
            let list = prevState.list
            list.push(element)
            return {list: list}
        })
    }

    editShowing(element, index) {

        this.setState((prevState) => {
            let list = prevState.list
            list[index] = element
            return {list: list}
        })
    }

    deleteShowing(index) {

        this.setState((prevState) => {
            let list = prevState.list
            list.splice(index, 1)
            return {list: list}
        })
    }

    render() {
        let list
        if (!this.state.list.length) {
            list =
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">Brak dostępnych seansów</div>
                </div>
        } else {
            //fixMe ja to nie mam pojecia co tutaj sie dzieje
            list = this.state.list.map(e => <div>
                <Link to={"/showing/details/" + Array.prototype.indexOf.call(this.state.list, e)}>
                    <Showing date={e.date} movie={e.movie} room={e.room} takenSeats={e.takenSeats}/>
                </Link>
            </div>)
        }
        return (
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
                <Route
                    exact
                    path="/showing/details/:id"
                    render={({match}) =>
                        <ShowingDetails showing={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                    deleteShowing={this.deleteShowing}/>}/>
                <Route
                    exact
                    path="/showing/edit/:id"
                    render={({match}) =>
                        <EditShowing showing={this.state.list[match.params.id]} index={parseInt(match.params.id)}
                                     editShowing={this.editShowing}/>}/>
            </Router>
        )
    }
}

export default ShowingList