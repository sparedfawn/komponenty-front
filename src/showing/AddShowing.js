import React from "react";
import axios from 'axios';
import { Redirect } from "react-router";
import './AddShowing.css'
import "../style.css"

class AddShowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            movieList: [],
            roomList: [],
            isOpenedMovie: false,
            headerValueMovie: 'Film',
            isOpenedRoom: false,
            headerValueRoom: 'Sala',
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
        if (this.state.headerValueRoom==='Sala' || this.state.headerValueMovie==='Film') {
            document.getElementById("alertBox").style.visibility = "visible";
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
            // <div class="container-fluid ">
            //     <div class="row paddingTriple">
            //         <div class="col-md-4">
            //             <div class="dropdown">
            //                 <button class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" onClick={this.setIsOpenedMovie}>
            //                     {this.state.headerValueMovie}
            //                 </button>

            //                 <ul class="dropdown-menu" >
            //                     {this.state.movieList.map(e => <li class="listItem center" onClick={this.setHeaderValueMovie}>{e.title}</li>)}
            //                 </ul>
            //             </div> 
            //         </div>

            //         <div class="col-md-4">
            //             <div class="dropdown">
                            // <button class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" onClick={this.setIsOpenedRoom}>
                            //     {this.state.headerValueRoom}
                            // </button>

                            // <ul class="dropdown-menu" >
                            //     {this.state.roomList.map(e => <li class="listItem center" onClick={this.setHeaderValueRoom}>{e.number}</li>)}
                            // </ul>
            //             </div>
            //         </div>

            //         <div class="col-md-4">
            //             <input type="datetime-local" value={this.state.date} onChange={this.dateOnChange}/>
            //         </div>

            //     </div>
            //     <div class="row">
            //         <div class="col-md-12">
            //             <button onClick={this.addShowing}>Add</button>  
            //         </div>
            //     </div>
            // </div>

            <div>
                <div class="addShowing">
                    <div class="dropdown padding">
                        <button class="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown" onClick={this.setIsOpenedMovie}>
                            {this.state.headerValueMovie}
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                            {this.state.movieList.map(e => <li class="listItem center" onClick={this.setHeaderValueMovie}>{e.title}</li>)}
                        </ul>
                    </div> 

                    <div class="dropdown padding">
                        <button class="btn btn-outline-primary dropdown-toggle" role="button" data-bs-toggle="dropdown" onClick={this.setIsOpenedRoom}>
                            {this.state.headerValueRoom}
                        </button>

                        <ul class="dropdown-menu" >
                            {this.state.roomList.map(e => <li class="listItem center" onClick={this.setHeaderValueRoom}>{e.number}</li>)}
                        </ul>
                    </div>

                    <div class="padding">
                        <input type="datetime-local" class="form-control" value={this.state.date} onChange={this.dateOnChange}></input>
                    </div>

                    <div class="padding">
                        <button class="btn btn-primary" onClick={this.addShowing}>Dodaj</button> 
                    </div>
                </div>

                <div id="alertBox" class="alert alert-danger" role="alert">
                    Wprowadź poprawne dane!
                </div>
            </div>

        )
    }
}

export default AddShowing