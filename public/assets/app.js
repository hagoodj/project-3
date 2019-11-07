// Validate.js dependency
// var validate = require("validate.js");

// Make sures that the whole document is ready
$(document).ready(function () {
    var id;
    var userId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    // var userId = 1;
    var donatorCardId = 1;
    checkNumberOfItems();

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
        validateForm(startDate,endDate, category, item, noOfItems, location);
        populateDonatorCards(startDate, endDate, category, item, noOfItems, location, image);
    })

    // Function to validate form
function validateForm(startDate,endDate, category, item, noOfItems, location) {
 if(startDate === ""){
    $("#input-sdate").css({
        "border": "1px solid red"
    });
    $("#input-sdate").tooltip();
 }
 else{
    $("#input-sdate").css({
        "border": "1px solid green"
    });
 }
  if(endDate === ""){
    $("#input-edate").css({
        "border": "1px solid red"
    });
    $("#input-edate").tooltip();
 }
 else{
    $("#input-edate").css({
        "border": "1px solid green"
    });
 }
  if(category === "--None--"){
     $("#dropdown-category").css({
        "border": "1px solid red"
    });
    $("#dropdown-category").tooltip();
 }
 else{
    $("#dropdown-category").css({
        "border": "1px solid green"
    });
 }
  if(item === ""){
    $("#input-item").css({
       "border": "1px solid red"    
   });
   $("#input-item").tooltip();
}
else{
    $("#input-item").css({
        "border": "1px solid green"
    });
 }
 if(noOfItems === ""){
    $("#input-noOfItems").css({
       "border": "1px solid red"    
   });
   $("#input-noOfItems").tooltip();
}
else{
    $("#input-noOfItems").css({
        "border": "1px solid green"
    });
 }
 if(location === ""){
    $("#input-location").css({
       "border": "1px solid red"    
   });
   $("#input-location").tooltip();
}
else{
    $("#input-location").css({
        "border": "1px solid green"
    });
 }


}

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
            image: image,
            UserId: userId
        }

        // Post a new value to database
        $.ajax("/api/new/donatorcard", {
            type: "POST",
            data: donation
        }).then(function () {
            console.log("Inserted into table");
        })
        // location.reload();
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
    // $("#requestDonation").on("click", function (event) {
    $(document).on("click", "#requestDonation", function (event) {
        event.preventDefault();
        id = $(this).data("id");
        console.log(id);
        console.log("Inside request donation button");
        $("#request-donation-modal").modal("toggle");
    })

    // When user clicks request button, values are entered to request table
    $("#request-btn").on("click", function (event) {
        event.preventDefault();
        var amount = $("#input-amount").val().trim();
        console.log(amount);
        populateRequest(amount);
        // updateDonatorCards(amount, id);
    })

    function populateRequest(amount) {
        console.log("Inside populate request");
        var data = {
            amount: amount,
            userId: userId,
            donatorCardId: donatorCardId
        }
        // Post a new value to database
        $.ajax("/api/new/request", {
            type: "POST",
            data: data
        }).then(function () {
            console.log("Inserted into Request table");
        })
    }

    function updateDonatorCards(amount, id) {
        var newAmount = {
            amount: amount
        }
        $.ajax("/api/donator/update/" + id, {
            type: "PUT",
            data: newAmount
        }).then(
            function () {
                console.log("Updated");
            }
        )
    }

    // Function to check if number of items in card is zero
    function checkNumberOfItems() {
        $.ajax("/api/itemsnumber", {
            type: "GET"
        }).then(
            function (result) {
                // console.log(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].itemnumber === 0) {
                        console.log(result[i].id);
                        deleteItems(result[i].id);
                    }
                }
            }
        )
    }

    // Function to delete items that has zero number of items
    function deleteItems(id) {
        $.ajax("/api/delete/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted");
            location.reload();
        })
    }

    // Function to delete cards
    $(".deleteRequestorCard").on("click", function(event){
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/deleteRequestorCard/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted requestor card");
            location.reload();
        })

    })

        // Function to delete cards
        $(".deleteDonatorCard").on("click", function(event){
            event.preventDefault();
            var id = $(this).data("id");
            
            $.ajax("/api/deleteDonatorCard/" + id, {
                type: "PUT"
            }).then(function (result) {
                console.log(result);
                console.log("Deleted donator card");
                location.reload();
            })
    
        })


})