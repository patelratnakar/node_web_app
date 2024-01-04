const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/ordercontroller");
const router = express.Router();

const { authuser, authroles } = require("../Middlewares/authorize");

router.route("/order/new").post(authuser, newOrder);

router.route("/order/:id").get(authuser, getSingleOrder);

router.route("/orders/me").get(authuser, myOrders);

router
  .route("/admin/orders")
  .get(authuser, authroles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(authuser, authroles("admin"), updateOrder)
  .delete(authuser, authroles("admin"), deleteOrder);

module.exports = router;
