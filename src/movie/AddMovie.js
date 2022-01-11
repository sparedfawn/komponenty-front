import React from "react";
import { Redirect } from "react-router";
import "../style.css"


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
        let func = this.props.addMovie
        func({
            title: this.state.title,
            duration: parseInt(this.state.duration)
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
                    <button class="btn btn-primary" onClick={this.addMovie}>Dodaj</button>
                </div>
            </form>
            
        )
    }
}

export default AddMovie