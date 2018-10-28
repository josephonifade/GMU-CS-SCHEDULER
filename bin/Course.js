"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseID_1 = require("./CourseID");
var Grade_1 = require("./Grade");
var Prereq_1 = require("./Prereq");
/**
 * A course to be included in the catalog.
 */
var Course = /** @class */ (function () {
    function Course(department, courseNumber, credits, minGrade, prerequisites, description) {
        if (description === void 0) { description = ""; }
        this.id = new CourseID_1.CourseID(department, courseNumber);
        this.credits = credits;
        this.minGrade = minGrade;
        this.prerequisites = prerequisites;
        this.description = description;
    }
    Course.prototype.checkPrerequisites = function () {
        var coursesTaken = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            coursesTaken[_i] = arguments[_i];
        }
        var _a;
        return (_a = this.prerequisites).validatePrereq.apply(_a, coursesTaken);
    };
    Course.prototype.checkPassed = function (grade) {
        return grade >= this.minGrade;
    };
    return Course;
}());
exports.Course = Course;
exports.catalog = new Map();
/* tslint:disable:no-magic-numbers */
var CS105 = new Course("CS", 105, 1, Grade_1.Grade.C, Prereq_1.Prereq.NONE);
exports.CS321 = new Course("CS", 321, 3, Grade_1.Grade.C, new Prereq_1.Prereq.And(Prereq_1.Prereq.Course.fromCourseName("CS 310"), new Prereq_1.Prereq.Or(Prereq_1.Prereq.Course.fromCourseName("ENGH 302"), new Prereq_1.Prereq.And(Prereq_1.Prereq.Course.fromCourseName("HNRS 110"), new Prereq_1.Prereq.Or(Prereq_1.Prereq.Course.fromCourseName("HNRS 122"), Prereq_1.Prereq.Course.fromCourseName("HNRS 130"), Prereq_1.Prereq.Course.fromCourseName("HNRS 230"), Prereq_1.Prereq.Course.fromCourseName("HNRS 240"))))));
var ENGH302 = new Course("ENGH", 302, 4, Grade_1.Grade.C, Prereq_1.Prereq.NONE);
/* tslint:enable:no-magic-numbers */
exports.catalog.set(CS105.id, CS105);
exports.catalog.set(exports.CS321.id, exports.CS321);
exports.catalog.set(ENGH302.id, ENGH302);
