"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID_1 = require("./CourseID");
var Grade_1 = require("./Grade");
/**
 * Prerequisite for a course
 *
 * Examples:
 *
 * Example 1 - CS 321: CS 310C and (ENGH 302C or (HNRS 110C and (HNRS 122C, 130C, 230C or 240C))).
 *
 * const CS321: Course = new Course("CS", 321, 3, Grade.C, new Prereq.And(
 *  Prereq.Course.fromCourseName("CS 310"), new Prereq.Or(
 *      Prereq.Course.fromCourseName("ENGH 302"), new Prereq.And(
 *          Prereq.Course.fromCourseName("HNRS 110"), new Prereq.Or(
 *              Prereq.Course.fromCourseName("HNRS 122"),
 *              Prereq.Course.fromCourseName("HNRS 130"),
 *              Prereq.Course.fromCourseName("HNRS 230"),
 *              Prereq.Course.fromCourseName("HNRS 240"))))));
 *
 * Example 2 - CS 105: No prerequisites
 *
 * const CS105: Course = new Course("CS", 105, 1, Grade.C, Prereq.NONE)
 */
var Prereq;
(function (Prereq) {
    var TO_STRING_DISTANCE_FOR_COMMA = 2;
    /**
     * Describes a course with no prerequisites
     */
    Prereq.NONE = { toString: function () { return "None"; },
        validatePrereq: function () {
            var _ = []; /*coursesTaken*/
            for (var _i = 0 /*coursesTaken*/; _i < arguments.length /*coursesTaken*/; _i++ /*coursesTaken*/) {
                _[_i] = arguments[_i]; /*coursesTaken*/
            }
            return true;
        } };
    /**
     * Describes multiple prerequisites where all are required
     */
    var And = /** @class */ (function () {
        function And() {
            var requirements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                requirements[_i] = arguments[_i];
            }
            if (requirements.length === 0) {
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
                if (!requirement.validatePrereq.apply(requirement, coursesTaken)) {
                    return false;
                }
            }
            return true;
        };
        And.prototype.toString = function (outer) {
            if (outer === void 0) { outer = true; }
            var previousRequirement = Prereq.NONE;
            var output = outer ? "" : "(";
            for (var i = 0; i < this.requirements.length; i++) {
                var requirement = this.requirements[i];
                if (previousRequirement instanceof Course && requirement instanceof Course
                    && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.courseNumber;
                }
                else {
                    output += requirement.toString(false);
                }
                if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += ", ";
                }
                else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
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
    /**
     * Describes multiple prerequisites where only one is required
     */
    var Or = /** @class */ (function () {
        function Or() {
            var requirements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                requirements[_i] = arguments[_i];
            }
            if (requirements.length === 0) {
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
                if (requirement.validatePrereq.apply(requirement, coursesTaken)) {
                    return true;
                }
            }
            return false;
        };
        Or.prototype.toString = function (outer) {
            if (outer === void 0) { outer = true; }
            var previousRequirement = Prereq.NONE;
            var output = outer ? "" : "(";
            for (var i = 0; i < this.requirements.length; i++) {
                var requirement = this.requirements[i];
                if (previousRequirement instanceof Course && requirement instanceof Course
                    && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.courseNumber;
                }
                else {
                    output += requirement.toString(false);
                }
                if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += ", ";
                }
                else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
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
    /**
     * Describes a prerequisite course
     */
    var Course = /** @class */ (function () {
        function Course(courseID, minGrade) {
            this.courseID = courseID;
            this.minGrade = minGrade;
        }
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
            return this.courseID.toString();
        };
        Course.fromCourseName = function (courseName, minGrade) {
            if (minGrade === void 0) { minGrade = Grade_1.Grade.C; }
            return new Course(CourseID_1.CourseID.fromCourseName(courseName), minGrade);
        };
        return Course;
    }());
    Prereq.Course = Course;
})(Prereq = exports.Prereq || (exports.Prereq = {}));
