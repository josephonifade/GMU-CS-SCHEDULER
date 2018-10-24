"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID_1 = require("./CourseID");
var Grade_1 = require("./Grade");
var Prereq;
(function (Prereq) {
    Prereq.NONE = { validatePrereq: function () {
            var coursesTaken = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                coursesTaken[_i] = arguments[_i];
            }
            return true;
        }, toString: function () { return "None"; } };
    var And = /** @class */ (function () {
        function And() {
            var requirements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                requirements[_i] = arguments[_i];
            }
            if (requirements.length == 0) {
                throw Error();
            }
            this.requirements = requirements;
        }
        And.prototype.validatePrereq = function () {
            var coursesTaken = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                coursesTaken[_i] = arguments[_i];
            }
            for (var _a = 0, _b = this.requirements; _a < _b.length; _a++) {
                var requirement = _b[_a];
                if (!requirement.validatePrereq.apply(requirement, coursesTaken))
                    return false;
            }
            return true;
        };
        And.prototype.toString = function (outer) {
            if (outer === void 0) { outer = true; }
            var previousRequirement = Prereq.NONE;
            var output = outer ? "" : "(";
            for (var i = 0; i < this.requirements.length; i++) {
                var requirement = this.requirements[i];
                if (previousRequirement instanceof Course && requirement instanceof Course && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.number;
                }
                else {
                    output += requirement.toString(false);
                }
                if (i < this.requirements.length - 2) {
                    output += ", ";
                }
                else if (i == this.requirements.length - 2) {
                    output += " and ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        };
        return And;
    }());
    Prereq.And = And;
    var Or = /** @class */ (function () {
        function Or() {
            var requirements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                requirements[_i] = arguments[_i];
            }
            if (requirements.length == 0) {
                throw Error();
            }
            this.requirements = requirements;
        }
        Or.prototype.validatePrereq = function () {
            var coursesTaken = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                coursesTaken[_i] = arguments[_i];
            }
            for (var _a = 0, _b = this.requirements; _a < _b.length; _a++) {
                var requirement = _b[_a];
                if (requirement.validatePrereq.apply(requirement, coursesTaken))
                    return true;
            }
            return false;
        };
        Or.prototype.toString = function (outer) {
            if (outer === void 0) { outer = true; }
            var previousRequirement = Prereq.NONE;
            var output = outer ? "" : "(";
            for (var i = 0; i < this.requirements.length; i++) {
                var requirement = this.requirements[i];
                if (previousRequirement instanceof Course && requirement instanceof Course && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.number;
                }
                else {
                    output += requirement.toString(false);
                }
                if (i < this.requirements.length - 2) {
                    output += ", ";
                }
                else if (i == this.requirements.length - 2) {
                    output += " or ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        };
        return Or;
    }());
    Prereq.Or = Or;
    var Course = /** @class */ (function () {
        function Course(courseID, minGrade) {
            this.courseID = courseID;
            this.minGrade = minGrade;
        }
        Course.fromCourseName = function (courseName, minGrade) {
            if (minGrade === void 0) { minGrade = Grade_1.Grade.C; }
            return new Course(CourseID_1.CourseID.fromCourseName(courseName), minGrade);
        };
        Course.prototype.validatePrereq = function () {
            var coursesTaken = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                coursesTaken[_i] = arguments[_i];
            }
            for (var _a = 0, coursesTaken_1 = coursesTaken; _a < coursesTaken_1.length; _a++) {
                var course = coursesTaken_1[_a];
                if (this.courseID.equals(course.courseID) && course.grade >= this.minGrade) {
                    return true;
                }
            }
            return false;
        };
        Course.prototype.toString = function () {
            var output = this.courseID.toString();
            return output;
        };
        return Course;
    }());
    Prereq.Course = Course;
})(Prereq = exports.Prereq || (exports.Prereq = {}));
