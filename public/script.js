
$("form").on("submit", (e) => {
    e.preventDefault();
    let itemName = $("#name").val();
    let itemPrice = $("#price").val();
    let newItem = {
        "name": itemName,
        "price": itemPrice
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/items',
        data: JSON.stringify(newItem),
        contentType: "application/json",
        success: success
    })
});

function success() {
    console.log("post successful")
}

async function getAllItems() {
    let items = await $.get("http://localhost:3000/items")
}