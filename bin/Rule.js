"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Course_1 = require("./Course");
var CreditRule = /** @class */ (function () {
    function CreditRule() {
    }
    CreditRule.prototype.checkRule = function (user) {
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
        return creditTotal >= 120;
    };
    CreditRule.prototype.errorMessage = function () {
        return "You have less than 120 credits.";
    };
    return CreditRule;
}());
exports.CreditRule = CreditRule;
