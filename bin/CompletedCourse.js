"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID_1 = require("./CourseID");
var CompletedCourse = /** @class */ (function () {
    function CompletedCourse(courseID, grade) {
        this.courseID = courseID;
        this.grade = grade;
    }
    CompletedCourse.fromCourseName = function (courseName, grade) {
        return new CompletedCourse(CourseID_1.CourseID.fromCourseName(courseName), grade);
    };
    return CompletedCourse;
}());
exports.CompletedCourse = CompletedCourse;
