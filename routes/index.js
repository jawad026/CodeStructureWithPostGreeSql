var express = require("express");
const studentController = require("../controller/student.Controller");
const profileController = require("../controller/profile.Controller");
const issueController = require("../controller/issue.Controller");
const courseController = require("../controller/course.Controller");
const studentCourseController = require("../controller/studentCourse.Controller");
const userController = require("../controller/user.Controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/student", studentController.getAllStudents);
router.post("/student", studentController.createStudents);
router.put("/student/:id", studentController.updateStudents);
router.delete("/student/:id", studentController.deleteStudents);
router.get("/student/limit", studentController.getStudentByLimit);

router.get("/profile", profileController.getAllProfiles);
router.post("/profile/:userId", profileController.createProfiles);

router.get("/issue", issueController.getAllIssues);
router.post("/issue/:userId", issueController.createIssues);


router.get("/course", courseController.getAllCourses);
router.post("/course/:userId", courseController.createCourses);

router.get("/coursestudent", studentCourseController.getAllStudentCourse);
router.post("/coursestudent", studentCourseController.createStudentCourses);


router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.post('/signup', userController.signupUser);





module.exports = router;
