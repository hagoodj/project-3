// Validate.js dependency
// var validate = require("validate.js");

// Make sures that the whole document is ready
$(document).ready(function () {
    // Grab all values entered by user when submit button is clicked
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        var startDate = $("#input-sdate").val().trim();
        var endDate = $("#input-edate").val().trim();
        var category = $("#dropdown-category :selected").text();
        var item = $("#input-item").val().trim();
        var noOfItems = $("#input-noOfItems").val().trim();
        var location = $("#input-location").val().trim();
        var image = $("#input-image").val().trim();

        populateDonatorCards(startDate, endDate, category, item, noOfItems, location, image);
    })

    // Function that populates values to Donator Cards
    function populateDonatorCards(startDate, endDate, category, item, noOfItems, location, image) {
        // New object that holds all user values
        var donation = {
            startDate: startDate,
            endDate: endDate,
            category: category,
            item: item,
            noOfItems: noOfItems,
            location: location,
            image: image
        }

        // Post a new value to database
        $.ajax("/api/new/donatorcard", {
            type: "POST",
            data: donation
        }).then(function () {
            console.log("Inserted into table");
        })

    }

    // On click of add button generates a modal with a form to add new card
    $("#add-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside add button");
        $("#add-modal").modal("toggle");
    })

    // On click of close button in modal refreshes page
    $("#modal-close").on("click", function (event) {
        event.preventDefault();
        console.log("Inside close modal button");
        location.reload();
    })

    // On click of request donation button
    $("#requestDonation").on("click", function(event){
        event.preventDefault();
        console.log("Inside request donation button");
        $("#request-donation-modal").modal("toggle");
    })

    
})