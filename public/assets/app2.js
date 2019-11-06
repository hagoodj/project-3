
$(document).ready(function () {

    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    // var userid = 1;

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
            UserId: userid
        });
    }

    function createRequestorCard(requestorCardData) {
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

    function makeDonation(amount) {
        console.log("making donation")
        createDonation({
            RequestorCardId: requestorcardid,
            UserId: userid,
            amount: amount,
            accepted: false
        });
    }

    function createDonation(donationData) {
        $.post("/api/new/donation", donationData)
            .then(console.log("created new donation"));
    }

    $("#homeButton").on("click", function (event) {
        event.preventDefault();
        window.location = "/" + userid;
    });

    $("#viewRequests").on("click", function (event) {
        event.preventDefault();
        window.location = "/requests/" + userid;
        getDonatorCards();
    });

    function getDonatorCards() {
        $.get("/donatorcards/" + userid, function (res) {
            getRequests(res);
        })
    }

    function getRequests(results) {
        for (i = 0; i < results.length; i++) {
            $.get("/requests/" + results.DonatorCardId, function () {})
        }
    }

    $("#viewDonations").on("click", function (event) {
        event.preventDefault();
        window.location = "/donations/" + userid;
        getRequestorCards();
    });

    function getRequestorCards() {
        $.get("/requestorcards/" + userid, function (res) {
            getDonations(res);
        })
    }

    function getDonations(results) {
        for (i = 0; i < results.length; i++) {
            $.get("/donations/" + results.RequestorCardId, function () {})
        }
    }

    // $("#viewRequestorCards").on("click", function (event) {
    //     event.preventDefault();
    //     window.location = "/usersrequestorcards/" + userid;
    // });

    // $("#viewDonatorCards").on("click", function (event) {
    //     event.preventDefault();
    //     window.location = "/usersdonatorcards/" + userid;
    // });

})