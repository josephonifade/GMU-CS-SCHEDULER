"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID = /** @class */ (function () {
    function CourseID(department, number) {
        this.department = department;
        this.number = number;
    }
    CourseID.fromCourseName = function (courseName) {
        var parts = courseName.trim().split(" ");
        var department = parts[0];
        var number = Number(parts[1]);
        return new CourseID(department, number);
    };
    CourseID.prototype.equals = function (other) {
        return this.department == other.department && this.number == other.number;
    };
    CourseID.prototype.toString = function () {
        return this.department + " " + this.number;
    };
    return CourseID;
}());
exports.CourseID = CourseID;
