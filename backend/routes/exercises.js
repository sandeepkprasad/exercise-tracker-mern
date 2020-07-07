const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get(function(req, res) { //Getting data.
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/add").post(function(req, res) { //Adding & saving data.
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({username, description, duration, date});

    newExercise.save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/:id").get(function(req, res) { //Getting data by id.
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/:id").delete(function(req, res) { //Deleting data by id.
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted!"))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/update/:id").post(function(req, res) { //Updating & saving data by id.
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error " + err));
    })
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;