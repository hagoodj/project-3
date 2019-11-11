import React from "react";

// Destructuring the type, className, children and onClick props, applying them to the button element
function Text() {
  return (
    <div>
      <br></br>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h4 className="text-info">
            It does not matter how much we donate; it matters whether the donation is meaningful. How to define meaningful? Let society and history judge. It's not how much we give but how much love we put into giving.
            There are many ways to push for much-needed reforms: One way is to make a donation. It doesn't matter much whether you contribute publicly or in a private way - either way is good. What matters is your true intention. The real destroyer of the liberties of the people is he who spreads among them bounties, donations and benefits.
      </h4>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default Text;
