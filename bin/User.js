"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rule");
/**
 * The year name of the user
 */
var Year;
(function (Year) {
    Year["Freshman"] = "Freshman";
    Year["Sophomore"] = "Sophomore";
    Year["Junior"] = "Junior";
    Year["Senior"] = "Senior";
})(Year = exports.Year || (exports.Year = {}));
/**
 * The user currently using the application
 */
var User = /** @class */ (function () {
    function User(semestersRemaining, year, creditYear, coursesTaken) {
        this.semestersRemaining = semestersRemaining;
        this.year = year;
        this.creditYear = creditYear;
        this.coursesTaken = coursesTaken;
    }
    /**
     * Checks if the user can graduate by evaluating their class record (courses taken & grades) against the list of
     * rules specified in Rule.ts.
     */
    User.prototype.checkCanGraduate = function () {
        for (var _i = 0, rules_1 = Rule_1.rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (!rule.checkRule(this)) {
                return false;
            }
        }
        return true;
    };
    return User;
}());
exports.User = User;
