import React from "react";
import axios from 'axios';
import styled from "styled-components";

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
            headerValueRoom: 'Room'
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
            }}).then(response => console.log(response))
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
            return {isOpenedMovie: !prevState.isOpenedMovie}
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
            return {isOpenedRoom: !prevState.isOpenedRoom}
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

        const DropDownContainer = styled("div")`
        width: 10.5em;
        margin: 0 auto;
          float: left;
        `;

        const DropDownHeader = styled("div")`
        margin-bottom: 0.8em;
        padding: 0.4em 2em 0.4em 1em;
        box-shadow: 0 2px 3px rgba(0,0,0,0.15);
        font-weight: 500;
        font-size: 1.3rem;
        color: #3faffa;
        background: #ffffff;
        `;

        const DropDownListContainer = styled("div")``;

        const DropDownList = styled("ul")`
          padding: 0;
          margin: 0;
          padding-left: 1em;
          background: #ffffff;
          border: 2px solid #e5e5e5;
          box-sizing: border-box;
          color: #3faffa;
          font-size: 1.3rem;
          font-weight: 500;
          &:first-child {
            padding-top: 0.8em;
          }`;

        const ListItem = styled("li")`
          list-style: none;
        margin-bottom: 0.8em;
        `;

        return (
            <div>
                <input type="datetime-local" value={this.state.date} onChange={this.dateOnChange}/>
                <button onClick={this.addShowing}>Add</button>

                <DropDownContainer>
                    <DropDownHeader onClick={this.setIsOpenedMovie}>{this.state.headerValueMovie}</DropDownHeader>
                    {this.state.isOpenedMovie && (<DropDownListContainer>
                        <DropDownList>
                            {this.state.movieList.map(e => <ListItem onClick={this.setHeaderValueMovie}>{e.title}</ListItem>)}
                        </DropDownList>
                    </DropDownListContainer>)}
                </DropDownContainer>

                <DropDownContainer>
                    <DropDownHeader onClick={this.setIsOpenedRoom}>{this.state.headerValueRoom}</DropDownHeader>
                    {this.state.isOpenedRoom && (<DropDownListContainer>
                        <DropDownList>
                            {this.state.roomList.map(e => <ListItem onClick={this.setHeaderValueRoom}>{e.number}</ListItem>)}
                        </DropDownList>
                    </DropDownListContainer>)}
                </DropDownContainer>
            </div>
        )
    }
}

export default AddShowing