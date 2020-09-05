const Crud = require("../models/crudModel");

/* 
    @route      GET /api/item
    @desc       GET all items
    @access     Public
*/
exports.getAllItems = (req, res) => {
  Crud.find()
    .sort({ date: -1 })
    .then((crud) => res.status(200).json(crud))
    .catch((err) => {
      res.status(400).send({
        message:
          "Error while retrieving all data from the server, I don't know why lol",
      });
    });
};

/* 
    @route      POST /api/item
    @desc       create new item
    @access     Private
*/
exports.createItem = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty, but your heart always empty, so sad:(",
    });

    return;
  }

  const newItem = new Crud({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    majorField: req.body.majorField,
  });

  newItem
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error while adding new Item, try again later, emmm....",
      });
    });
};

/* 
    @route      GET /api/item/isComplete
    @desc       find item where isComplete=true
    @access     Private
*/

exports.findIsComplete = (req, res) => {
  Crud.find({ isComplete: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          "Error!! Can not find the requested data, maybe you was searching for non-existing data",
      });
    });
};

/* 
    @route      DELETE /api/item/:id
    @desc       DELETE one item by id
    @access     public
*/

exports.deleteItem = (req, res) => {
  Crud.findById(req.params.id)
    .then((data) => {
      data
        .remove()
        .then(() => {
          res.status(200).send({ message: "Delete one item success" });
        })
        .catch((err) => {
          res.status(400).send({ message: "Error while deleting one item" });
        });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Can not find the given Id, try another lol",
      });
    });
};
