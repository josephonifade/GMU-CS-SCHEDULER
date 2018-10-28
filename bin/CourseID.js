"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The identifying information of a course -- the department and number
 */
var CourseID = /** @class */ (function () {
    function CourseID(department, courseNumber) {
        this.department = department;
        this.courseNumber = courseNumber;
    }
    CourseID.prototype.equals = function (other) {
        return this.department === other.department && this.courseNumber === other.courseNumber;
    };
    CourseID.prototype.toString = function () {
        return this.department + " " + this.courseNumber;
    };
    /**
     * Static method to parse a CourseID object from a course name (e.g. "CS 321")
     */
    CourseID.fromCourseName = function (courseName) {
        var parts = courseName.trim().split(" ");
        var department = parts[0];
        var courseNumber = Number(parts[1]);
        return new CourseID(department, courseNumber);
    };
    return CourseID;
}());
exports.CourseID = CourseID;
