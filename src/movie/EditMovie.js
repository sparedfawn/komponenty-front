import React from "react";
import axios from 'axios';
import {Redirect} from "react-router";
import "../style.css"

class EditMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.movie.title,
            duration: props.movie.duration,
            redirect: false
        }

        this.editMovie = this.editMovie.bind(this)
    }

    editMovie = () => {

        axios.put('http://localhost:7777/movie/edit/' + this.props.index, {
            title: this.state.title,
            duration: this.state.duration
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {

                let func = this.props.editMovie
                func({
                    title: this.state.title,
                    duration: this.state.duration
                }, parseInt(this.props.index))
            }
        })

        this.setState({redirect: true})
    }

    titleOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            title: value
        })
    }
    durationOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            duration: value
        })
    }


    render() {

        if (this.state.redirect) {

            return <Redirect to="/movie"/>
        }

        return (
            <form class="formLayout">
                <div>
                    <label class="form-label">Tytul filmu</label>
                    <input type="text" class="form-control" value={this.state.title} onChange={this.titleOnChange}></input>
                </div>

                <div class="paddingTop">
                    <label class="form-label">Dlugosc trwania</label>
                    <input type="number" class="form-control" value={this.state.duration} onChange={this.durationOnChange}></input>
                </div>

                <div class="paddingTop center">
                    <button class="btn btn-primary" onClick={this.editMovie}>Edytuj</button>
                </div>
            </form>

        )
    }
}

export default EditMovie