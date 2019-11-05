
$(document).ready(function () {

    $("#addRequestorCard").on("click", function (event) {
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

    

})