var SERVER_URL = "http://localhost:54321/products";

// GET all the things

var getProductsOperation = $.ajax({
    url: SERVER_URL + "/products",
    method: GET
});

getProductsOperation.done(function (productsArray) {
    var $productTable = $("<table></table>");
    productsArray.forEach(function (product) {
        var $productRow = $("<tr></tr>", {
            class: "productRow"
        });
        $productRow.append($("<td></td>", {
            text: product.name,
            class: "productName"
        }));
        $productRow.append($("<td></td>", {
            text: product.description
        }));
        $productRow.append($("<td></td>", {
            text: product.price
        }));
        $productTable.append($productRow);
    });
    $(document.body).append($productTable);
});

