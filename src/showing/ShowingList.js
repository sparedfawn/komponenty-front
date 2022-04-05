import React from "react";
import Showing from "./Showing";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import AddShowing from "./AddShowing";
import "../style.css";
import EditShowing from "./EditShowing";
import ShowingDetails from "./ShowingDetails";
import * as Api from "../api";

class ShowingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            movieList: [],
            roomList: [],
            inputValue: 0,
        };

        this.addShowing = this.addShowing.bind(this);
        this.editShowing = this.editShowing.bind(this);
        this.deleteShowing = this.deleteShowing.bind(this);
        this.roomListCheck = this.roomListCheck.bind(this);
        this.movieListCheck = this.movieListCheck.bind(this);
        this.inputValueChange = this.inputValueChange.bind(this);
        this.setHeaderValue = this.setHeaderValue.bind(this);
    }

    componentDidMount() {
        Api.getAllShowing()
            .then((response) =>
                this.setState((state) => {
                    let list = response.data;
                    return { list: list };
                })
            )
            .catch((error) => console.log(error));
    }

    addShowing = (element) => {
        Api.addShowing(element).then(() => {
            this.setState((prevState) => {
                let list = prevState.list;
                list.push(element);
                return { list: list };
            });
        });
    };

    editShowing = (element, index) => {
        Api.editShowing(element, index).then(() => {
            this.setState((prevState) => {
                let list = prevState.list;
                list[index] = element;
                return { list: list };
            });
        });
    };

    deleteShowing = (index) => {
        Api.deleteShowing(index).then(() => {
            this.setState((prevState) => {
                let list = prevState.list;
                list.splice(index, 1);
                return { list: list };
            });
        });
    };

    roomListCheck = (e) => {
        let roomList = this.state.roomList;
        roomList[e.target.id - 1].checked = !roomList[e.target.id - 1].checked;

        this.setState({ roomList: roomList });
    };

    movieListCheck = (e) => {
        let movieList = this.state.movieList;
        let index = movieList.indexOf(
            movieList.find((element) => element.title === e.target.id)
        );
        movieList[index].checked = !movieList[index].checked;

        this.setState({ movieList: movieList });
    };

    inputValueChange = (e) => {
        let value = e.target.value;

        this.setState({ inputValue: value });
    };

    setHeaderValue = (e) => {
        let value = e.target.innerText;
        this.setState({ headerValue: value });
    };

    render() {
        const list = this.state.list.map((e) => (
            <div>
                <Link
                    to={
                        "/showing/details/" +
                        Array.prototype.indexOf.call(this.state.list, e)
                    }
                >
                    <Showing
                        date={e.date}
                        movie={e.movie}
                        room={e.room}
                        takenSeats={e.takenSeats}
                        ticketPrice={e.ticketPrice}
                    />
                </Link>
            </div>
        ));

        return (
            <Switch>
                <Route exact path="/showing">
                    <div>
                        <div class="row">
                            {list.length === 0 && (
                                <div class="alertLayout center">
                                    <div
                                        class="alert alert-secondary"
                                        role="alert"
                                    >
                                        Brak dostępnych seansów
                                    </div>
                                </div>
                            )}
                            {list}
                        </div>
                        <div class="row">
                            <div class="center padding">
                                <Link class="btn btn-primary" to="/showing/add">
                                    Dodaj
                                </Link>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/showing/add">
                    <AddShowing
                        addShowing={this.addShowing}
                        showingList={this.state.list}
                    />
                </Route>
                <Route
                    exact
                    path="/showing/details/:id"
                    render={({ match }) => (
                        <ShowingDetails
                            showing={this.state.list[match.params.id]}
                            index={parseInt(match.params.id)}
                            deleteShowing={this.deleteShowing}
                            editShowing={this.editShowing}
                        />
                    )}
                />
                <Route
                    exact
                    path="/showing/edit/:id"
                    render={({ match }) => (
                        <EditShowing
                            showing={this.state.list[match.params.id]}
                            index={parseInt(match.params.id)}
                            editShowing={this.editShowing}
                            showingList={this.state.list}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default ShowingList;
