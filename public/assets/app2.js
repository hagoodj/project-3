
$(document).ready(function () {

    // var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    var userid = 1;

    $("#addRequestorCard").on("click", function (event) {
        event.preventDefault();
        var category = $("#requestorCardCategory").val().trim();
        var item = $("#requestorCardItem").val().trim();
        var location = $("#requestorCardLocation").val().trim();
        var numberneeded = $("#requestorCardNumberNeeded").val().trim();
        var priority = Boolean($("#requestorCardPriority").val());
        var image = $("#requestorCardImage").val().trim();
        if (!category || !item || !location || !numberneeded || !priority) {
            return;
        } else {
            addRequestorCard(category, item, location, numberneeded, priority, image);
        }
    });

    function addRequestorCard(category, item, location, numberneeded, priority, image) {
        console.log("adding RequestorCard")
        createRequestorCard({
            category: category,
            item: item,
            location: location,
            numberneeded: numberneeded,
            priority: priority,
            image: image,
        });
    }

    function createRequestorCard(requestorCardData) {
        console.log(requestorCardData);
        window.location.reload();
        $.post("/api/new/requestorcard", requestorCardData)
            .then(console.log("created new requestor card"));
    }

    var requestorcardid;

    $(".donate").on("click", function (event) {
        event.preventDefault();
        requestorcardid = $(this).data("id");
    });

    $("#offerDonation").on("click", function (event) {
        event.preventDefault();
        var amount = $("#offerDonationNumber").val().trim();
        if (!amount) {
            return;
        } else {
            makeDonation(amount);
        }
    })

    function makeDonation (amount) {
        console.log("making donation")
        createDonation({
            RequestorCardId: requestorcardid,
            UserId: userid,
            amount: amount,
            accepted: false
        });
    }

    function createDonation(donationData) {
        console.log(donationData);
        $.post("/api/new/donation", donationData)
            .then(console.log("created new donation"));
    }

})