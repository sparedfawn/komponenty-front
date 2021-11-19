import React from "react";
import axios from "axios";
import Room from "./Room";

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:7777/room/all')
            .then(response => this.setState(state => {
                console.log(response.data)
                let list = response.data
                return { list: list }
            }))
            .catch(error => console.log(error))
    }

    render() {
        let list
        if (!this.state.list.length) {
            list = <p>List is empty</p>
        }
        else {
            list = this.state.list.map(e => <Room num={e.number} capacity={e.capacity}/>)
        }

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default RoomList