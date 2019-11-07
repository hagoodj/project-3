
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
            .then(function () {
                console.log("created new donation");
                location.reload();
            }
            );
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
            $.get("/requests/" + results.DonatorCardId, function () { })
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
            $.get("/donations/" + results.RequestorCardId, function () { })
        }
    }

    $("#viewCards").on("click", function (event) {
        event.preventDefault();
        window.location = "/allusercards/" + userid;
    });

    // **************************************************************************************************************************

    $(".acceptDonation").on("click", updateDonation, updateRequestorCard)

    function updateDonation() {
        var acceptDonationRequestorCardId = $(this).data("requestorcardid");
        var acceptDonationUserId = $(this).data("userid");
        var updateAccepted = {
            accepted: true
        };
        $.ajax({
            method: "PUT",
            url: "/api/donation/" + acceptDonationRequestorCardId + "/" + acceptDonationUserId,
            data: updateAccepted
        }).then(console.log("updated card: " + acceptDonationRequestorCardId + " with user id: " + acceptDonationUserId));
    }

    function updateRequestorCard() {
        var acceptDonationRequestorCardId = $(this).data("requestorcardid");
        var amount = $(this).data("amount");
        var updateAcceptedRequestorCard = {
            amount: amount
        };
        $.ajax({
            method: "PUT",
            url: "/api/updaterequestorcard/" + acceptDonationRequestorCardId,
            data: updateAcceptedRequestorCard
        }).then(console.log("updated card: " + acceptDonationRequestorCardId));
    }

    // **************************************************************************************************************************

    $(".acceptRequest").on("click", updateRequest, updateDonatorCard)

    function updateRequest() {
        var acceptRequestDonatorCardId = $(this).data("donatorcardid");
        var acceptRequestUserId = $(this).data("userid");
        var updateAccepted = {
            accepted: true
        };
        $.ajax({
            method: "PUT",
            url: "/api/request/" + acceptRequestDonatorCardId + "/" + acceptRequestUserId,
            data: updateAccepted
        }).then(console.log("updated card: " + acceptRequestDonatorCardId + " with user id: " + acceptRequestUserId));
    }

    function updateDonatorCard() {
        var acceptRequestDonatorCardId = $(this).data("donatorcardid");
        var amount = $(this).data("amount");
        var updateAcceptedDonatorCard = {
            amount: amount
        };
        $.ajax({
            method: "PUT",
            url: "/api/updatedonatorcard/" + acceptRequestDonatorCardId,
            data: updateAcceptedDonatorCard
        }).then(console.log("updated card: " + acceptRequestDonatorCardId));
    }

    // **************************************************************************************************************************

    $(".denyDonation").on("click", deleteDonation)

    function deleteDonation() {
        var denyDonationRequestorCardId = $(this).data("requestorcardid");
        var denyDonationUserId = $(this).data("userid");
        $.ajax({
            method: "DELETE",
            url: "/api/delete/donation/" + denyDonationRequestorCardId + "/" + denyDonationUserId 
        }).then(function () {
            console.log("deleted donation")
            location.reload();
        });
    }

    $(".denyRequest").on("click", deleteRequest)

    function deleteRequest() {
        var denyRequestDonatorCardId = $(this).data("donatorcardid");
        var denyRequestUserId = $(this).data("userid");
        $.ajax({
            method: "DELETE",
            url: "/api/delete/request/" + denyRequestDonatorCardId  + "/" + denyRequestUserId
        }).then(function () {
            console.log("deleted request")
            location.reload();
        });
    }

})