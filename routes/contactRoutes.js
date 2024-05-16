const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getindivisualContact,
  putContact,
  deleteContact,
} = require("../controllers/contactController");
const { validateToken } = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route("/").get(getContact).post(createContact);
// router.route("/").post(createContact);
router
  .route("/:id")
  .get(getindivisualContact)
  .put(putContact)
  .delete(deleteContact);
// router.route("/:id").put(putContact);
// router.route("/:id").delete(deleteContact);

module.exports = router;
//   export default router
