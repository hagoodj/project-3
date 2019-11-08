import React, { Component } from "react";
import Nav from "../components/Nav/index";
import API from "../utils/API";
import { Table, TableData } from "../components/Table"
import Background from "../assets/images/bg1.jpg"

class Cards extends Component {
    state = {
        donatorCards: []
    };

    componentDidMount() {
        this.loadCards();
    }

    loadCards = () => {
        API.getAllCards()
            .then(res => {
                console.log("Inside get all cards");
                console.log(res.data);
                var arr = res.data;
                this.setState({ donatorCards: arr });
            })
    }

    getCards = () => {
        API.getAllCards()
            .then(res => {
                console.log("Inside get all cards");
                console.log(res.data);
                var arr = res.data;
                this.setState({ donatorCards: arr });
            })

    }

    render() {
        const Style = {
            row: {
                backgroundImage: 'url(' + Background + ')', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                height: "1000px"
            }
        }

        return (
            <div>
                
                <div className="row" style={Style.row}>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                    <Nav cards={this.getCards} />
                        <table className="table table-dark">
                            <thead>
                                <Table />
                            </thead>

                            {this.state.donatorCards.map(card => (

                                <TableData
                                    key={card._id}
                                    location={card.location}
                                    id={card.UserId}
                                    category={card.category}
                                    image={card.image}
                                    item={card.item}
                                    itemNumber={card.noOfItems}
                                />))}
                        </table>
                    </div>
                    <div className="col-md-2"></div>
                </div>


            </div>
        )
    }
}

export default Cards;

