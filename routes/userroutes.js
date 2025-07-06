const express = require("express");
const router = express.Router();
const {userInsert, userRead, userUpdate, userDelete, userReadById, userReadByEmail} = require("../controllers/usercontrollers");

router.post("/user-insert", userInsert);            // http://localhost:3000/api/users/user-insert
router.get("/user-read", userRead);
router.put("/user-update/:id", userUpdate);
router.delete("/user-delete/:id", userDelete);
router.get("/user-read-by-id/:id", userReadById);
router.get("/user-read-by-email/:email", userReadByEmail);
// router.get("/user-read-by-phone/:phone", userReadByPhone);

module.exports = router;


// app.post("/user-insert", userInsert);
// app.get("/user-read", userRead);
// app.put("/user-update/:id", userUpdate);
// app.delete("/user-delete/:id", userDelete);
// app.get("/user-read-by-id/:id", userReadById);
// app.get("/user-read-by-email/:email", userReadByEmail);
// app.get("/user-read-by-phone/:phone", userReadByPhone);

// module.exports = router;
