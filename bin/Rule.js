"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Course_1 = require("./Course");
var TOTAL_CREDIT_REQUIREMENT = 120;
/**
 * A student must have 120 credits to graduate
 */
var CreditRule = /** @class */ (function () {
    function CreditRule() {
    }
    CreditRule.prototype.checkRule = function (user) {
        console.log("checked rule");
        var creditTotal = 0;
        for (var _i = 0, _a = user.coursesTaken; _i < _a.length; _i++) {
            var courseTaken = _a[_i];
            var course = Course_1.catalog.get(courseTaken.courseID);
            if (course == null) {
                continue;
            }
            if (course.checkPrerequisites() && course.checkPassed(courseTaken.grade)) {
                creditTotal += course.credits;
            }
        }
        return creditTotal >= TOTAL_CREDIT_REQUIREMENT;
    };
    CreditRule.prototype.errorMessage = function () {
        return "You have less than 120 credits.";
    };
    return CreditRule;
}());
/**
 * List of all rules. Each rule created should be added to this list.
 */
exports.rules = [new CreditRule()];
