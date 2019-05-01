
$(document).ready(function() {
    getAllItems()
});

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
    console.log("request successful")
    $("#cart").html("")
    getAllItems()
}

async function getAllItems() {
    let $cart = $("#cart")
    let list = await $.get("http://localhost:3000/items")
    list.items.forEach(item => {
        let toAppend = `<div>
                            <strong>Name:</strong> ${item.name}
                            <br>
                            <strong>Price:</strong> ${item.price}
                            <br>
                            <button class="del" id="${item.name}">delete</button>
                        </div>`
        $cart.append(toAppend)
    });
}

$("#cart").on("click", ".del", (e) => {
    e.preventDefault();
    let name = $(e.target).attr("id")
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/items/${name}`,
        success: success
    })
});