import {Course} from './Course';
import {User} from './User';

export const TOTAL_CREDIT_REQUIREMENT: number = 120;

/**
 * A rule that is checked to determine if a student is ready to graduate
 */
export interface Rule {
  checkRule(user: User, catalog: Map<string, Course>): boolean;
  errorMessage(): string;
}

/**
 * A student must have 120 credits to graduate
 */
export const CREDIT_RULE: Rule = {
  checkRule: (user: User, catalog: Map<string, Course>) => {
    let creditTotal: number = 0;

    for (const courseTaken of user.coursesTaken) {
      const course = catalog.get(JSON.stringify(courseTaken.courseID));
      if (course == null) {
        continue;
      }
      if (course.checkPrerequisites() && course.checkPassed(courseTaken.grade)) {
        creditTotal += course.credits;
      }
    }

    return creditTotal >= TOTAL_CREDIT_REQUIREMENT;
  },
  errorMessage: () => 'You have less than 120 credits.'
};

/**
 * List of all rules. Each rule created should be added to this list.
 */
export let rules: Rule[] = [CREDIT_RULE];
