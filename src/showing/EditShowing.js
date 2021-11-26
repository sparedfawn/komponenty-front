import React from "react";
import axios from 'axios';
import {Redirect} from "react-router";
import './AddShowing.css'
import "../style.css"

class EditShowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.showing.date,
            headerValueMovie: props.showing.movie.title,
            headerValueRoom: props.showing.room.number,
            movieList: [],
            roomList: [],
            redirect: false
        }

        this.editShowing = this.editShowing.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:7777/room/all')
            .then(response => this.setState(state => {
                let list = response.data
                return { roomList: list }
            }))
            .catch(error => console.log(error))

        axios.get('http://localhost:7777/movie/all')
            .then(response => this.setState(state => {
                let list = response.data
                return {movieList: list}
            }))
            .catch(error => console.log(error))
    }

    editShowing = () => {

        let room = this.state.roomList.find(e => e.number === parseInt(this.state.headerValueRoom));
        let movie = this.state.movieList.find(e => e.title === this.state.headerValueMovie);

        axios.put('http://localhost:7777/showing/edit/' + this.props.index, {
            date: this.state.date,
            movie: movie,
            room: room,
            takenSeats: this.props.showing.takenSeats
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {

                let func = this.props.editShowing
                func({
                    date: this.state.date,
                    movie: movie,
                    room: room,
                    takenSeats: this.props.showing.takenSeats
                }, parseInt(this.props.index))
            }
        })

        this.setState({redirect: true})
    }

    dateOnChange = (event) => {
        let value = event.target.value
        this.setState({
            date: value
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

            return <Redirect to="/showing"/>
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
                        <input type="datetime-local" class="form-control" value={this.state.date} onChange={this.dateOnChange}/>
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