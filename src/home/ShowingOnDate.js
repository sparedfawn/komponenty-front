import React from "react";
import Showing from "../showing/Showing";
import * as Api from "../api";

class ShowingOnDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            date: "2022-04-05",
        };
    }

    componentDidMount() {
        Api.getAllShowing()
            .then((response) =>
                this.setState((state) => {
                    let list = response.data;
                    return { list: list };
                })
            )
            .catch((error) => console.log(error));
    }

    dateOnChange = (event) => {
        let value = event.target.value;

        this.setState({
            date: value,
        });
    };

    render() {
        const list = this.state.list
            .filter((e) => {
                const date = new Date(e.date);
                const pickedDate = new Date(this.state.date);

                return (
                    date.getDate() === pickedDate.getDate() &&
                    date.getMonth() === pickedDate.getMonth() &&
                    date.getFullYear() === pickedDate.getFullYear()
                );
            })
            .map((e) => (
                <div>
                    <Showing
                        date={e.date}
                        movie={e.movie}
                        room={e.room}
                        takenSeats={e.takenSeats}
                    />
                </div>
            ));
        return (
            <div>
                <div className="paddingTop">
                    <input
                        type="date"
                        className="form-control"
                        onChange={this.dateOnChange}
                    />
                    {list.length === 0 && (
                        <div class="alertLayout center">
                            <div class="alert alert-secondary" role="alert">
                                Brak seansów danego dnia
                            </div>
                        </div>
                    )}
                    {list}
                </div>
            </div>
        );
    }
}

export default ShowingOnDate;
