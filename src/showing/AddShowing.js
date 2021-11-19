import React from "react";
import axios from 'axios';
import { Redirect } from "react-router";
import './AddShowing.css'

class AddShowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            movieList: [],
            roomList: [],
            isOpenedMovie: false,
            headerValueMovie: 'Movie',
            isOpenedRoom: false,
            headerValueRoom: 'Room',
            redirect: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7777/movie/all')
            .then(response => this.setState(state => {
                let list = response.data
                return { movieList: list }
            }))
            .catch(error => console.log(error))

        axios.get('http://localhost:7777/room/all')
            .then(response => this.setState(state => {
                let list = response.data
                return { roomList: list }
            }))
            .catch(error => console.log(error))
    }

    addShowing = () => {
        if (this.state.headerValueRoom==='Room' || this.state.headerValueMovie==='Movie') {
            alert("Wybierz wymagane dane")
        }
        else {
            let room = this.state.roomList.find(e => e.number===parseInt(this.state.headerValueRoom));
            let movie = this.state.movieList.find(e => e.title===this.state.headerValueMovie);

            axios.post('http://localhost:7777/showing/add',{
                date: this.state.date,
                movie: movie,
                room: room
            }, {
                headers: {
                'Content-type': 'application/json'
            }}).then(response => {
                if (response.status === 200) {

                    let func = this.props.addShowing
                    func({
                        date: this.state.date,
                        movie: movie,
                        room: room,
                        takenSeats: []
                    })
                }
            })

            this.setState({redirect: true})
        }
    }

    dateOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            date: value
        })
    }

    setIsOpenedMovie = () => {
        this.setState(prevState => {
            return {
                isOpenedMovie: !prevState.isOpenedMovie,
                isOpenedRoom: false
            }
        })
    }

    setHeaderValueMovie = (event) => {
        this.setState({
            headerValueMovie: event.target.innerText,
            isOpenedMovie: false
        })
    }

    setIsOpenedRoom = () => {
        this.setState(prevState => {
            return {
                isOpenedRoom: !prevState.isOpenedRoom,
                isOpenedMovie: false
            }
        })
    }

    setHeaderValueRoom = (event) => {
        this.setState({
            headerValueRoom: event.target.innerText,
            isOpenedRoom: false
        })
    }

    roomOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            room: value
        })
    }


    render() {

        if (this.state.redirect) {

            return <Redirect to="/showing"/>
        }

        return (
            <div>
                <input type="datetime-local" value={this.state.date} onChange={this.dateOnChange}/>
                <button onClick={this.addShowing}>Add</button>

                <div class="dropdownContainer">
                    <div class="dropdownHeader" onClick={this.setIsOpenedMovie}>{this.state.headerValueMovie}</div>
                    {this.state.isOpenedMovie && (<div>
                        <ul class="dropdownList">
                            {this.state.movieList.map(e => <li class="listItem" onClick={this.setHeaderValueMovie}>{e.title}</li>)}
                        </ul>
                    </div>)}
                </div>

                <div class="dropdownContainer">
                    <div class="dropdownHeader" onClick={this.setIsOpenedRoom}>{this.state.headerValueRoom}</div>
                    {this.state.isOpenedRoom && (<div>
                        <ul class="dropdownList">
                            {this.state.roomList.map(e => <li class="listItem" onClick={this.setHeaderValueRoom}>{e.number}</li>)}
                        </ul>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default AddShowing