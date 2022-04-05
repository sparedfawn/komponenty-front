import React from "react";
import Room from "./Room";
import "../style.css";
import * as Api from "../api";

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        Api.getAllRoom()
            .then((response) =>
                this.setState((state) => {
                    console.log(response.data);
                    let list = response.data;
                    return { list: list };
                })
            )
            .catch((error) => console.log(error));
    }

    render() {
        let list;
        if (!this.state.list.length) {
            list = (
                <div class="alertLayout center">
                    <div class="alert alert-secondary" role="alert">
                        Brak dodanych sal
                    </div>
                </div>
            );
        } else {
            list = this.state.list.map((e) => (
                <Room num={e.number} capacity={e.capacity} />
            ));
        }

        return <div>{list}</div>;
    }
}

export default RoomList;
