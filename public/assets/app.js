// Make sures that the whole document is ready
$(document).ready(function(){
    // Grab all values entered by user when submit button is clicked
    $("#submit-btn").on("click", function(event){
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
})