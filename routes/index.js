var express = require("express");
const userController = require("../controller/user.Controller");
const profileController = require("../controller/profile.Controller");
const issueController = require("../controller/issue.Controller");
const courseController = require("../controller/course.Controller");
const studentCourseController = require("../controller/studentCourse.Controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/student", userController.getAllStudents);
router.post("/student", userController.createStudents);
router.put("/student/:id", userController.updateStudents);
router.delete("/student/:id", userController.deleteStudents);
router.get("/student/limit", userController.getStudentByLimit);

router.get("/profile", profileController.getAllProfiles);
router.post("/profile/:userId", profileController.createProfiles);

router.get("/issue", issueController.getAllIssues);
router.post("/issue/:userId", issueController.createIssues);


router.get("/course", courseController.getAllCourses);
router.post("/course/:userId", courseController.createCourses);

router.get("/coursestudent", studentCourseController.getAllStudentCourse);
router.post("/coursestudent", studentCourseController.createStudentCourses);





module.exports = router;
