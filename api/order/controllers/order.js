"use strict";

//got my stripe password from stripe dashboard
const stripe = require("stripe")(
  "sk_test_51H1pkYHEt5lrQ3FNunAdg2MsJ7xjY1V7NEkHegDhIw4siaNDEKCQO8s6J4qvaFwO4Nn7QsSmq3Y7TwMUSs6iOhcp00PLFmTzSh"
)
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctxt) => {
    const { name, total, items, stripeTokenId } = ctxt.request.body;
    const { id } = ctxt.state.user;

    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctxt.state.user.username}`,
    });

    // return charge;

    const orders = await strapi.services.order.create({
      name,
      total,
      items,
      user: id
    });

    return orders;
  },
};
