function Round(num) {
  return Math.round(num * 100) / 100;
}

$(document).ready( () => {

  let totalPrice = 0;

  let currentId = 1;

  $('.add-item-button').on("click", () => {

    let itemName = $('.item-name').val();
    let itemPrice = $('.item-price').val();

    let removeButton = $("<button class='remove-item-button'>Remove</button>");
    let inputQuantity = $("<div class='col-xs-4'><strong class='qty-box'>QTY</strong></div>");
    let inputQuantityForm = $("<input class='change-quantity' type='number'  prev='1' value='1' min='1'>");
    let itemTotal = $("<div class='col-xs-1 item-total'>$--.--</div>");

    if (itemName && itemPrice && parseFloat(itemPrice)) {

      totalPrice += Round(parseFloat(itemPrice));

      // append to list
      let newItem = $("<div class='row cart-item' id=" + "'list-item-" + String(currentId) + "'></li>");

      let newRemoveButton = removeButton.clone();
      let newInputQuantity = inputQuantity.clone();
      let newInputQuantityForm = inputQuantityForm.clone();
      let newItemTotal = itemTotal.clone();

      newItem.append($("<div class='col-xs-3'>" + itemName + "</div>"));

      newItem.append($("<div class='col-xs-3'>$" + parseFloat(itemPrice).toFixed(2) + "</div>"));

      newInputQuantity.append(newInputQuantityForm);

      newItem.append(newInputQuantity);

      newItem.append(newItemTotal);

      newInputQuantityForm.on("change", () => {

        let difference = newInputQuantityForm.val() - newInputQuantityForm.attr("prev");
        console.log(difference)

        if (difference < 0) {
          // quantity down
          totalPrice -= Round(parseFloat(itemPrice));
        } else {
          // quantity up
          totalPrice += Round(parseFloat(itemPrice));
        }

        // update item total costs
        newItemTotal.text("$--.--");
        // update total costs
        $(".total-price").text("$" + totalPrice.toFixed(2));

        // set prev attribute to new value
        newInputQuantityForm.attr("prev", newInputQuantityForm.val());

      });

      newInputQuantity.append(newRemoveButton);

      newRemoveButton.on("click", () => {
        totalPrice -= (Round(parseFloat(itemPrice)) * newInputQuantityForm.val());

        $(".total-price").text("$" + totalPrice.toFixed(2));

        $(newRemoveButton).parent().parent().remove();

      });

      $(".shopping-list").append(newItem);

      // clear form
      $(".item-name").val("");
      $('.item-price').val("");

      // update total costs
      $(".total-price").text("$" + totalPrice.toFixed(2));

      // update currentId
      currentId++;

    }

  });

});