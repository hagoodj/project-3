import React from "react";
import Background from "../../assets/images/bg4.jpg"

function Nav() {
    const Style = {
        navbar : {
            backgroundImage: `url(${Background})`,
            height: "250px"
        }
    }

  return (
    <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <nav className="navbar navbar-dark bg-dark shadow-lg p-3 mb-5 bg-dark rounded text-center"style={Style.navbar}>
                <div className="container">
                    <h1 className="display-4 text-dark text-center">Donation Station</h1>
                </div>
            </nav>
        </div>
        <div className="col-md-2"></div>
    </div>
)
}

export default Nav;