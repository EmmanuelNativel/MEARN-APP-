let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.route("/create-student").post(async (req, res, next) => {
  console.log("CREATE");

  const findStudent = await studentSchema.findOne({ email: req.body.email });

  if (findStudent) {
    console.log("Student already exist !");
    return res.status(400).json({
      text: "Cet addresse mail est déjà utilisée."
    });
  }

  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Students
router.route("/").get((req, res) => {
  console.log("LIST");
  studentSchema.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single Student
router.route("/edit-student/:id").get((req, res) => {
  studentSchema.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Student
router.route("/update-student/:id").put((req, res, next) => {
  studentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

// Delete Student
router.route("/delete-student/:id").delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = router;
