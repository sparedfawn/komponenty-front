import React from "react";

class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            time: ''
        }
    }

    addMovie = () => {
        const { addMovie } = this.props;
        addMovie(this.state)
    }

    titleOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            title: value
        })
    }
    timeOnChange = (event) => {
        let value = event.target.value
        this.setState( {
            time: value
        })
    }


    render() {

        return (
            <div>
                <input type="text" value={this.state.title} placeholder="Tytul filmu" onChange={this.titleOnChange}/>
                <input type="text" value={this.state.time} placeholder="Dlugosc trwania" onChange={this.timeOnChange}/>
                <button onClick={this.addMovie}>Add</button>
            </div>
        )
    }
}

export default AddMovie