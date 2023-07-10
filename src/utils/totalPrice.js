export const totalPrice = (card) => {
  let totalPrice = 0;
  card?.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  card.totalPrice = totalPrice;
};
