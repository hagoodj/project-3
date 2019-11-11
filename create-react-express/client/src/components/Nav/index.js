import React from "react";
import Background from "../../assets/images/img2.jpg";
import { Link } from "react-router-dom";

function Nav(props) {
    const Style = {
        navbar : {
            backgroundImage: `url(${Background})`,
            height: "250px"
        }
    }

  return (
    <div className="row">

        <div className="col-md-12">
            <nav className="navbar navbar-dark bg-dark shadow-lg p-3 mb-5 bg-dark rounded text-center"style={Style.navbar}>
     <div>
       <ul className="navbar-nav">
         <li className="nav-item">
           <Link
             to="/"
             className={
               window.location.pathname === "/" || window.location.pathname === "/home"
                 ? "nav-link active"
                 : "nav-link"
             }
           >
             Home
           </Link>
         </li>
         <li className="nav-item">
           <Link
             to="/cards"
             onClick={props.cards}
             className={window.location.pathname === "/cards" ? "nav-link active" : "nav-link"}
           >
             More Details
           </Link>
         </li>
       </ul>
     </div>
            </nav>
        </div>

    </div>
)
}

export default Nav;