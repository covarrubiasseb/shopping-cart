$(document).ready( () => {

  let totalPrice = 0;

  let currentId = 1;

  $('.add-item-button').on("click", () => {

    let itemName = $('.item-name').val();
    let itemPrice = $('.item-price').val();

    let removeButton = $("<button class='remove-item-button'>Remove</button>");
    let inputQuantity = $("<input class='change-quantity' type='number'  prev='1' value='1' min='1'>");

    if (itemName && itemPrice && Number(itemPrice)) {

      totalPrice += Number(itemPrice);

      // append to list
      let newItem = $("<li id=" + "'list-item-" + String(currentId) + "'></li>");

      let newRemoveButton = removeButton.clone();
      let newInputQuantity = inputQuantity.clone();

      newItem.append($("<span class='shopping-list-item-box'>" + itemName + "</span>"));

      newItem.append($("<span class='shopping-list-item-box'>$" + itemPrice + "</span>"));

      newItem.append($("<span>QTY</span>"));
      newItem.append(newInputQuantity);

      newInputQuantity.on("change", () => {

        let difference = newInputQuantity.val() - $(newInputQuantity).attr("prev");

        if (difference < 0) {
          // quantity down
          totalPrice -= Number(itemPrice);
        } else {
          // quantity up
          totalPrice += Number(itemPrice);
        }

        // update total costs
        $(".total-price").text("$" + totalPrice);

        // set prev attribute to new value
        newInputQuantity.attr("prev", newInputQuantity.val());

      });

      newItem.append(newRemoveButton);

      newRemoveButton.on("click", () => {
        totalPrice -= (itemPrice * newInputQuantity.val());

        $(".total-price").text("$" + totalPrice);

        $(newRemoveButton).parent().remove();

      });

      $(".shopping-list").append(newItem);

      // clear form
      $(".item-name").val("");
      $('.item-price').val("");

      // update total costs
      $(".total-price").text("$" + totalPrice);

      // update currentId
      currentId++;

    }

  });

});