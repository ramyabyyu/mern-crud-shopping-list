const express = require("express");
const router = express.Router();
const crud = require("../../controllers/crudController");
const auth = require("../../middleware/auth");

/* 
    fetching all item from database
*/
router.get("/", auth, crud.getAllItems);

/* 
    creating one new item and save it
    to database
*/
router.post("/", auth, crud.createItem);

/* 
    find item with condition
    isComplete = true
*/
router.get("/isComplete", auth, crud.findIsComplete);

/* 
    delete one item by id
*/
router.delete("/:id", auth, crud.deleteItem);

module.exports = router;
