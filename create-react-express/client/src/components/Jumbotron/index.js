import React from "react";
import Background from '../../assets/images/bg8.jpg';
import Carousel from 'react-bootstrap/Carousel'

function Jumbotron() {
    const Style = {
        jumbotron: {
            backgroundImage: `url(${Background})`
        }
    }

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="assets/images/img1.jpg" className="d-block w-100" alt="assets/images/img.jpg"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="assets/images/img2.jpg" className="d-block w-100" alt="assets/images/img.jpg"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="assets/images/img3.jpg" className="d-block w-100" alt="assets/images/img.jpg"></img>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default Jumbotron;