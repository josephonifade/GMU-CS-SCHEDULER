import {catalog} from "./Course";
import {User} from "./User";

const TOTAL_CREDIT_REQUIREMENT: number = 120;

/**
 * A rule that is checked to determine if a student is ready to graduate
 */
export interface Rule {
    checkRule(user: User): boolean;
    errorMessage(): string;
}

/**
 * A student must have 120 credits to graduate
 */
class CreditRule implements Rule {

    public checkRule(user: User): boolean {
        console.log("checked rule");
        let creditTotal: number = 0;

        for (const courseTaken of user.coursesTaken) {
            const course = catalog.get(courseTaken.courseID);
            if (course == null) {
                continue;
            }
            if (course.checkPrerequisites() && course.checkPassed(courseTaken.grade)) {
                creditTotal += course.credits;
            }
        }

        return creditTotal >= TOTAL_CREDIT_REQUIREMENT;
    }

    public errorMessage(): string {
        return "You have less than 120 credits.";
    }
}

/**
 * List of all rules. Each rule created should be added to this list.
 */
export let rules: Rule[] = [new CreditRule()];
