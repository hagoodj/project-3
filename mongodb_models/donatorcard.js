const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donatorCardSchema = new Schema({
    startDate: { type: String },
    endDate: { type: String },
    category: { type: String },
    item: { type: String },
    location: { type: String },
    noOfItems: { type: Number },
    image: { type: String },
    UserId: {type: Number }
    });

    const DonatorCard = mongoose.model("DonatorCard", donatorCardSchema);

module.exports = DonatorCard;
    
