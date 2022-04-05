import React from "react";
import { Redirect } from "react-router";
import "./AddShowing.css";
import "../style.css";
import * as Api from "../api";

class EditShowing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.showing.date,
            headerValueMovie: props.showing.movie.title,
            headerValueRoom: props.showing.room.number,
            movieList: [],
            roomList: [],
            redirect: false,
            price: props.showing.ticketPrice,
        };

        this.editShowing = this.editShowing.bind(this);
        this.validationPassed = this.validationPassed.bind(this);
    }

    componentDidMount() {
        Api.getAllRoom()
            .then((response) =>
                this.setState((state) => {
                    let list = response.data;
                    return { roomList: list };
                })
            )
            .catch((error) => console.log(error));

        Api.getMovies()
            .then((response) =>
                this.setState((state) => {
                    let list = response.data;
                    return { movieList: list };
                })
            )
            .catch((error) => console.log(error));
    }

    editShowing = () => {
        if (validationPassed) {
            document.getElementById("alertBox").style.visibility = "hidden";
            let func = this.props.editShowing;
            func(
                {
                    date: this.state.date,
                    movie: movie,
                    room: room,
                    takenSeats: this.props.showing.takenSeats,
                    ticketPrice: this.state.price,
                },
                parseInt(this.props.index)
            );

            this.setState({ redirect: true });
        }
    };

    validationPassed = () => {
        const alertBox = document.getElementById("alertBox");

        const formDate = new Date(this.state.date);
        const currentDate = new Date();
        const pickedMovie = this.state.movieList.find(
            (e) => e.title === this.state.headerValueMovie
        );
        const pickedRoom = this.state.roomList.find(
            (e) => e.number === this.state.headerValueRoom
        );

        if (
            this.state.headerValueRoom === "Sala" ||
            this.state.headerValueMovie === "Film" ||
            this.state.date === "Data"
        ) {
            alertBox.style.visibility = "visible";
            alertBox.textContent = "Formularz nie zostal wypelniony w calosci";
            return false;
        }
        if (
            formDate.getTime() + pickedMovie.duration * 60000 <
            currentDate.getTime()
        ) {
            alertBox.style.visibility = "visible";
            alertBox.textContent = "Podana data juz minela";
            return false;
        }

        const showingsCollidingWithAdded = this.showingsList.filter(
            (e) =>
                e.room.number === pickedRoom.number &&
                ((formDate.getTime() >= new Date(e.date).getTime() &&
                    formDate.getTime() <=
                        new Date(e.date).getTime() +
                            e.movie.duration * 60000) ||
                    (formDate.getTime() + pickedMovie.duration * 60000 >=
                        new Date(e.date).getTime() &&
                        formDate.getTime() + pickedMovie.duration * 60000 <=
                            new Date(e.date).getTime() +
                                e.movie.duration * 60000) ||
                    (new Date(e.date).getTime() >= formDate.getTime() &&
                        new Date(e.date).getTime() <=
                            formDate.getTime() +
                                pickedMovie.duration * 60000) ||
                    (new Date(e.date).getTime() + e.movie.duration * 60000 >=
                        formDate.getTime() &&
                        new Date(e.date).getTime() + e.movie.duration * 60000 <=
                            formDate.getTime() + movie[0].duration * 60000))
        );

        if (showingsCollidingWithAdded.length > 0) {
            alertBox.style.visibility = "visible";
            alertBox.textContent = "Wystepuje kolizja z innymi seansami";
            return false;
        }

        return true;
    };

    dateOnChange = (event) => {
        let value = event.target.value;
        this.setState({
            date: value,
        });
    };

    priceOnChange = (event) => {
        let value = event.target.value;
        this.setState({
            price: value,
        });
    };

    setHeaderValueMovie = (event) => {
        this.setState({
            headerValueMovie: event.target.innerText,
        });
    };

    setHeaderValueRoom = (event) => {
        this.setState({
            headerValueRoom: event.target.innerText,
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/showing" />;
        }
        return (
            <div>
                <div class="addShowing">
                    <div class="dropdown padding">
                        <button
                            class="btn btn-outline-primary dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            {this.state.headerValueMovie}
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            {this.state.movieList.map((e) => (
                                <li
                                    class="listItem center"
                                    onClick={this.setHeaderValueMovie}
                                >
                                    {e.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div class="dropdown padding">
                        <button
                            class="btn btn-outline-primary dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            {this.state.headerValueRoom}
                        </button>

                        <ul class="dropdown-menu">
                            {this.state.roomList.map((e) => (
                                <li
                                    class="listItem center"
                                    onClick={this.setHeaderValueRoom}
                                >
                                    {e.number}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div class="padding">
                        <input
                            type="datetime-local"
                            class="form-control"
                            value={this.state.date}
                            onChange={this.dateOnChange}
                        />
                    </div>

                    <div class="padding">
                        <input
                            type="number"
                            class="form-control"
                            value={this.state.price}
                            onChange={this.priceOnChange}
                        />
                    </div>

                    <div class="padding">
                        <button
                            class="btn btn-primary"
                            onClick={this.editShowing}
                        >
                            Edytuj
                        </button>
                    </div>
                </div>

                <div id="alertBox" class="alert alert-danger" role="alert">
                    Wprowadź poprawne dane!
                </div>
            </div>
        );
    }
}

export default EditShowing;
