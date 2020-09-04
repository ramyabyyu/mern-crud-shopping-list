const express = require("express");
const router = express.Router();
const crud = require("../../controllers/crudController");

/* 
    fetching all item from database
*/
router.get("/", crud.getAllItems);

/* 
    creating one new item and save it
    to database
*/
router.post("/", crud.createItem);

/* 
    find item with condition
    isComplete = true
*/
router.get("/isComplete", crud.findIsComplete);

/* 
    delete one item by id
*/
router.delete("/:id", crud.deleteItem);

/* 
    update a tutorial
*/
router.put("/:id", crud.update);

module.exports = router;
