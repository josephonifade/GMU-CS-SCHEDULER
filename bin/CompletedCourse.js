"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID_1 = require("./CourseID");
/**
 * A course completed by the user. Note that a completed course does not imply that the course was PASSED.
 */
var CompletedCourse = /** @class */ (function () {
    function CompletedCourse(courseID, grade) {
        this.courseID = courseID;
        this.grade = grade;
    }
    /**
     * Static method to generate a CompletedCourse object from a course name (e.g. "CS 321")
     * @param courseName
     * @param grade
     */
    CompletedCourse.fromCourseName = function (courseName, grade) {
        return new CompletedCourse(CourseID_1.CourseID.fromCourseName(courseName), grade);
    };
    return CompletedCourse;
}());
exports.CompletedCourse = CompletedCourse;
