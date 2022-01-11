import React from "react";
import { Redirect } from "react-router";
import './AddShowing.css'
import "../style.css"
import * as Api from "../api"

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
            price: props.showing.ticketPrice
        }

        this.editShowing = this.editShowing.bind(this)
    }

    componentDidMount() {
        Api.getAllRoom().then(response => this.setState(state => {
            let list = response.data
            return { roomList: list }
        }))
            .catch(error => console.log(error))

        Api.getMovies().then(response => this.setState(state => {
            let list = response.data
            return { movieList: list }
        }))
            .catch(error => console.log(error))
    }

    editShowing = () => {
        if (this.state.headerValueRoom==='Sala' || this.state.headerValueMovie==='Film' || this.state.date==='Data') {
            document.getElementById("alertBox").style.visibility = "visible";
        }
        else {
            let room = this.state.roomList.find(e => e.number===parseInt(this.state.headerValueRoom));
            let movie = this.state.movieList.find(e => e.title===this.state.headerValueMovie);
            
            let sameRoom;
            let sameTime = this.props.showingList.find(e => {
                let newFilmDate = new Date(this.state.date);
                let todayDate = new Date();

                let oldFilmStartHour = new Date(e.date).getHours();
                let oldFilmStartMinute = new Date(e.date).getMinutes();
                let oldFilmEndHour = new Date(e.date).getHours() + Math.floor(e.movie.duration / 60);
                let oldFilmEndMinute = new Date(e.date).getMinutes() + (movie.duration % 60);
                
                if(oldFilmEndMinute > 60) {
                    oldFilmEndHour += 1;
                    oldFilmEndMinute -= 60;
                }
                
                let newFilmStartHour = new Date(this.state.date).getHours();
                let newFilmStartMinute = new Date(this.state.date).getMinutes();
                let newFilmEndHour = new Date(this.state.date).getHours() + Math.floor(movie.duration / 60);
                let newFilmEndMinute = new Date(this.state.date).getMinutes() + (movie.duration % 60);

                if(newFilmEndHour > 60) {
                    newFilmEndHour += 1;
                    newFilmEndHour -= 60;
                }

                let tmp = new Date(e.date);

                if (newFilmDate.getDate() === todayDate.getDate()) {
                     if(e.room.number === parseInt(this.state.headerValueRoom)) {
                        if(newFilmEndHour < oldFilmStartHour) { }
                        else if(newFilmEndHour === oldFilmStartHour && newFilmEndMinute < oldFilmStartMinute) { }
                        else if(oldFilmEndHour < newFilmStartHour) { }
                        else if(oldFilmEndHour === newFilmStartHour && oldFilmEndMinute < newFilmStartMinute) { }
                        else { return e; }
                    }
                } else if(newFilmDate.getDate() === tmp.getDate()) {
                    if(e.room.number === parseInt(this.state.headerValueRoom)) {
                        if(newFilmEndHour < oldFilmStartHour) { }
                        else if(newFilmEndHour === oldFilmStartHour && newFilmEndMinute < oldFilmStartMinute) { }
                        else if(oldFilmEndHour < newFilmStartHour) { }
                        else if(oldFilmEndHour === newFilmStartHour && oldFilmEndMinute < newFilmStartMinute) { }
                        else { return e; }
                    }
                } 
            });

            if(typeof(sameRoom) === 'undefined' && typeof(sameTime) === 'undefined') {
                document.getElementById("alertBox").style.visibility = "hidden";
                let func = this.props.editShowing
                func({
                    date: this.state.date,
                    movie: movie,
                    room: room,
                    takenSeats: this.props.showing.takenSeats,
                    ticketPrice: this.state.price
                }, parseInt(this.props.index))
        
                this.setState({ redirect: true })
            } else {
                document.getElementById("alertBox").style.visibility = "visible";
                document.getElementById("alertBox").textContent = "W tych godzinach sala jest zajeta!";
            }
        }        
    }

    dateOnChange = (event) => {
        let value = event.target.value
        this.setState({
            date: value
        })
    }

    priceOnChange = (event) => {

        let value = event.target.value
        this.setState({
            price: value
        })
    }

    setHeaderValueMovie = (event) => {
        this.setState({
            headerValueMovie: event.target.innerText
        })
    }

    setHeaderValueRoom = (event) => {
        this.setState({
            headerValueRoom: event.target.innerText
        })
    }


    render() {

        if (this.state.redirect) {

            return <Redirect to="/showing" />
        }
        return (

            <div>
                <div class="addShowing">
                    <div class="dropdown padding">
                        <button class="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown">
                            {this.state.headerValueMovie}
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            {this.state.movieList.map(e => <li class="listItem center"
                                onClick={this.setHeaderValueMovie}>{e.title}</li>)}
                        </ul>
                    </div>

                    <div class="dropdown padding">
                        <button class="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown">
                            {this.state.headerValueRoom}
                        </button>

                        <ul class="dropdown-menu">
                            {this.state.roomList.map(e => <li class="listItem center"
                                onClick={this.setHeaderValueRoom}>{e.number}</li>)}
                        </ul>
                    </div>

                    <div class="padding">
                        <input type="datetime-local" class="form-control" value={this.state.date} onChange={this.dateOnChange} />
                    </div>

                    <div class="padding">
                        <input type="number" class="form-control" value={this.state.price} onChange={this.priceOnChange} />
                    </div>

                    <div class="padding">
                        <button class="btn btn-primary" onClick={this.editShowing}>Edytuj</button>
                    </div>
                </div>

                <div id="alertBox" class="alert alert-danger" role="alert">
                    Wprowadź poprawne dane!
                </div>
            </div>
        )
    }
}

export default EditShowing