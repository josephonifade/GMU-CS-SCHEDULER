import { CATALOG } from './Catalog';
import {CompletedCourse} from './CompletedCourse';
import {rules} from './Rule';

/**
 * The year name of the user
 */
export enum Year {
  Freshman = 'Freshman',
  Sophomore = 'Sophomore',
  Junior = 'Junior',
  Senior = 'Senior'
}

/**
 * The user currently using the application
 */
export class User {
  public semestersRemaining: number;
  public year: Year;
  public creditYear: Year;
  public coursesTaken: CompletedCourse[];

  constructor(
    semestersRemaining: number,
    year: Year,
    creditYear: Year,
    coursesTaken: CompletedCourse[]
  ) {
    this.semestersRemaining = semestersRemaining;
    this.year = year;
    this.creditYear = creditYear;
    this.coursesTaken = coursesTaken;
  }

  /**
   * Checks if the user can graduate by evaluating their class record
   * (courses taken & grades) against the list of rules specified in Rule.ts.
   */
  public checkCanGraduate(): boolean {
    for (const rule of rules) {
      if (!rule.checkRule(this, CATALOG)) {
        return false;
      }
    }
    return true;
  }
}
