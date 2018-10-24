"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rule");
var Semester;
(function (Semester) {
    Semester[Semester["Fall2016"] = 0] = "Fall2016";
})(Semester = exports.Semester || (exports.Semester = {}));
var Year;
(function (Year) {
    Year["Freshman"] = "Freshman";
    Year["Sophomore"] = "Sophomore";
    Year["Junior"] = "Junior";
    Year["Senior"] = "Senior";
})(Year = exports.Year || (exports.Year = {}));
var User = /** @class */ (function () {
    function User(semestersRemaining, year, creditYear, coursesTaken) {
        this.semestersRemaining = semestersRemaining;
        this.year = year;
        this.creditYear = creditYear;
        this.coursesTaken = coursesTaken;
    }
    User.prototype.checkCanGraduate = function () {
        for (var _i = 0, _a = User.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (!rule.checkRule(this)) {
                return false;
            }
        }
        return true;
    };
    User.rules = [new Rule_1.CreditRule()];
    return User;
}());
exports.User = User;
