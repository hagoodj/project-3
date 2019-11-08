
$(document).ready(function () {

    var userid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    // var userid = 1;
    checkNumberOfItems();

    $("#viewNotifications").on("click", function (event) {
        event.preventDefault();
        showAcceptedRequests();
    })

    function showAcceptedRequests() {
        $.get("/api/acceptedrequests/" + userid, function (data) {
            console.log("Data from getting accepted request: ")
            console.log(data);
        }).then(function () {
            showAcceptedDonations();
        })
    }

    function showAcceptedDonations() {
        $.get("/api/accepteddonations/" + userid, function (data) {
            console.log("Data from getting accepted donation: ")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $.notify("Your donation of " + data[i].amount + data[i].item + "s has been accepted.\nPlease contact " + data[i].requestoremail + " to coordinate exchange.\nOnce you close this notificaiton, you will no longer be able to see this email address.");
            }
        })
    }

    // Function to check if number of items in card is zero
    function checkNumberOfItems() {
        console.log("Inside numberof items needed");
        $.ajax("/api/numberneeded", {
            type: "GET"
        }).then(
            function (result) {
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    if (result[i].numberneeded === 0) {
                        console.log(result[i].id);
                        deleteRequestorCard(result[i].id);
                    }
                }
            }
        )
    }

    // Function to delete requestor cards that has number needed value zero
    function deleteRequestorCard(id) {
        $.ajax("/api/delete/requestorcard/" + id, {
            type: "PUT"
        }).then(function (result) {
            console.log(result);
            console.log("Deleted requestor Card");
            location.reload();
        })
    }

    $("#addRequestorCard").on("click", function (event) {
        event.preventDefault();
        var category = $("#requestorCardCategory").val().trim();
        var item = $("#requestorCardItem").val().trim();
        var location = $("#requestorCardLocation").val().trim();
        var numberneeded = $("#requestorCardNumberNeeded").val().trim();
        var priority = Boolean($("#requestorCardPriority").val());
        var image = $("#requestorCardImage").val().trim();

        // if (!category || !item || !location || !numberneeded || !priority) {
        //     return;
        // } else {
        validateForm(category, item, location, numberneeded, priority);
        getUserEmail(category, item, location, numberneeded, priority, image);
        // }
    });

    // Validation Function
    function validateForm(category, item, location, numberneeded, priority) {
        if (category === "--None--") {
            $("#requestorCardCategory").css({
                "border": "2px solid red"
            });
            $("#requestorCardCategory").tooltip();
        }
        else {
            $("#requestorCardCategory").css({
                "border": "2px solid green"
            });
        }
        if (item === "") {
            $("#requestorCardItem").css({
                "border": "2px solid red"
            });
            $("#requestorCardItem").tooltip();
        }
        else {
            $("#requestorCardItem").css({
                "border": "2px solid green"
            });
        }
        if (location === "") {
            $("#requestorCardLocation").css({
                "border": "2px solid red"
            });
            $("#requestorCardLocation").tooltip();
        }
        else {
            $("#requestorCardLocation").css({
                "border": "2px solid green"
            });
        }
        if (numberneeded === "") {
            $("#requestorCardNumberNeeded").css({
                "border": "2px solid red"
            });
            $("#requestorCardNumberNeeded").tooltip();
        }
        else {
            if (typeof (numberneeded) == "number") {
                $("#requestorCardNumberNeeded").css({
                    "border": "2px solid green"
                });
            }
            else {
                $("#requestorCardNumberNeeded").css({
                    "border": "2px solid black"
                });
                $("#requestorCardNumberNeeded").tooltip();
            }
        }
        if (priority === "") {
            $("#requestorCardPriority").css({
                "border": "2px solid red"
            });
            $("#requestorCardPriority").tooltip();
        }
        else {
            $("#requestorCardPriority").css({
                "border": "2px solid green"
            });
        }
    }

    function getUserEmail(category, item, location, numberneeded, priority, image) {

        $.get("/api/" + userid, function () {
        }).then(function (result) {
            console.log("result.email: " + result.email)
            var useremail = result.email
            addRequestorCard(category, item, location, numberneeded, priority, image, useremail);
        })

    }

    function addRequestorCard(category, item, location, numberneeded, priority, image, useremail) {

        console.log("adding RequestorCard")
        createRequestorCard({
            category: category,
            item: item,
            location: location,
            numberneeded: numberneeded,
            priority: priority,
            image: image,
            UserId: userid,
            useremail: useremail
        });
    }

    function createRequestorCard(requestorCardData) {
        // window.location.reload();
        $.post("/api/new/requestorcard", requestorCardData)
            .then(console.log("created new requestor card"));
    }

    var requestorcardid;
    var item;
    var useremail;

    $(".donate").on("click", function (event) {
        event.preventDefault();
        requestorcardid = $(this).data("id");
        item = $(this).data("item");
        useremail = $(this).data("useremail");
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
            item: item,
            requestoremail: useremail
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

    // **************************************************************************************************************************

    $(".viewRequests").on("click", function (event) {
        event.preventDefault();
        var viewRequestsForThisCardId = $(this).data("id")
        window.location = "/requests/" + viewRequestsForThisCardId + "/" + userid;
        getRequests(viewRequestsForThisCardId);
    });

    // function getDonatorCards() {
    //     $.get("/donatorcards/" + userid, function (res) {
    //         getRequests(res);
    //     })
    // }


    function getRequests(cardid) {
        // for (i = 0; i < results.length; i++) {
        $.get("/requests/" + cardid, function () {
            console.log("all requests for donator card with id: " + cardid)
        })
        // }
    }

    // **************************************************************************************************************************

    $(".viewDonations").on("click", function (event) {
        event.preventDefault();
        var viewDonationsForThisCardId = $(this).data("id")
        window.location = "/donations/" + viewDonationsForThisCardId + "/" + userid;
        getDonations(viewDonationsForThisCardId);
    });

    // function getRequestorCards() {
    //     $.get("/requestorcards/" + userid, function (res) {
    //         getDonations(res);
    //     })
    // }


    function getDonations(cardid) {
        // for (i = 0; i < results.length; i++) {
        $.get("/donations/" + cardid, function () {
            console.log("all donations for requestor card with id: " + cardid)
        })
        // }
    }

    $("#viewCards").on("click", function (event) {
        event.preventDefault();
        window.location = "/allusercards/" + userid;
    });

    // **************************************************************************************************************************

    $(".acceptDonation").on("click", updateDonation)
    $(".acceptDonation").on("click", updateRequestorCard)

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
        }).then(console.log("updated card: " + acceptDonationRequestorCardId + " with user id: " + acceptDonationUserId + "to accepted"));
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
        }).then(console.log("updated card: " + acceptRequestDonatorCardId + " with user id: " + acceptRequestUserId + "to accepted"));
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

    $(".denyDonation").on("click", denyDonation)

    function denyDonation() {
        var denyDonationRequestorCardId = $(this).data("requestorcardid");
        var denyDonationUserId = $(this).data("userid");
        var updateDenied = {
            accepted: false
        };
        $.ajax({
            method: "PUT",
            url: "/api/donation/" + denyDonationRequestorCardId + "/" + denyDonationUserId,
            data: updateDenied
        }).then(console.log("updated card: " + denyDonationRequestorCardId + " with user id: " + denyDonationUserId + "to denied"));
    }

    // function deleteDonation() {
    //     var denyDonationRequestorCardId = $(this).data("requestorcardid");
    //     var denyDonationUserId = $(this).data("userid");
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/delete/donation/" + denyDonationRequestorCardId + "/" + denyDonationUserId 
    //     }).then(function () {
    //         console.log("deleted donation")
    //         location.reload();
    //     });
    // }

    $(".denyRequest").on("click", denyRequest)

    function denyRequest() {
        var denyRequestDonatorCardId = $(this).data("donatorcardid");
        var denyRequestUserId = $(this).data("userid");
        var updateDenied = {
            accepted: false
        };
        $.ajax({
            method: "PUT",
            url: "/api/request/" + denyRequestDonatorCardId + "/" + denyRequestUserId,
            data: updateDenied
        }).then(console.log("updated card: " + denyRequestDonatorCardId + " with user id: " + denyRequestUserId + "to denied"));
    }

    // function deleteRequest() {
    //     var denyRequestDonatorCardId = $(this).data("donatorcardid");
    //     var denyRequestUserId = $(this).data("userid");
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/delete/request/" + denyRequestDonatorCardId  + "/" + denyRequestUserId
    //     }).then(function () {
    //         console.log("deleted request")
    //         location.reload();
    //     });
    // }

})