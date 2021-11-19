import axios from "axios";
import React from "react";
import { Redirect } from "react-router";

class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            duration: '',
            redirect: false
        }
    }

    addMovie = () => {

        axios.post('http://localhost:7777/movie/add',{
                title: this.state.title,
                duration: this.state.duration
            }, {
                headers: {
                'Content-type': 'application/json'
            }}).then(response => {
                if (response.status === 200) {

                    let func = this.props.addMovie
                    func({
                        title: this.state.title,
                        duration: this.state.duration
                    })
                }})

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
            <div>
                <input type="text" value={this.state.title} placeholder="Tytul filmu" onChange={this.titleOnChange}/>
                <input type="text" value={this.state.duration} placeholder="Dlugosc trwania" onChange={this.durationOnChange}/>
                <button onClick={this.addMovie}>Add</button>
            </div>
        )
    }
}

export default AddMovie