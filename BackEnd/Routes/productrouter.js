// Requiring Express
const express = require("express");
const app = express();

// Requiring Router
const router = express.Router();

// Requiring Middlewares
const { authuser, authroles } = require("../Middlewares/authorize");

// Requiring controllers
const {
  getallproducts,
  addnewproduct,
  updateproduct,
  deleteproduct,
  getproduct,
  createproductreview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../Controllers/productcontroller");

router.get("/products", getallproducts);

router.route("/product/:id").get(getproduct);

router.put("/product/:id/review", authuser, createproductreview);
router.route("/reviews").get(getProductReviews).delete(authuser, deleteReview);

// ADMIN
router.post("/admin/product/new", authuser, authroles("admin"), addnewproduct);

router.route("/admin/products").get(authuser, authroles("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .put(authuser, authroles("admin"), updateproduct)
  .delete(authuser, authroles("admin"), deleteproduct);

// Exporting Router
module.exports = router;
