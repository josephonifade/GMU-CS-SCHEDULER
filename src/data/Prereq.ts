import {CompletedCourse} from './CompletedCourse';
import {CourseID} from './CourseID';
import {Grade} from './Grade';
import { Token } from './ScraperTypes';

/**
 * Prerequisite for a course
 *
 * Examples:
 *
 * Example 1:
 * CS 321: CS 310C and
 * (ENGH 302C or (HNRS 110C and (HNRS 122C, 130C, 230C or 240C))).
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
 * Example 2:
 * CS 105: No prerequisites
 *
 * const CS105: Course = new Course("CS", 105, 1, Grade.C, Prereq.NONE)
 */
export namespace Prereq {
  const TO_STRING_DISTANCE_FOR_COMMA: number = 2;

  export enum PrereqTypeIdentifier{
    AND, OR, NONE, COURSE
  }

  /**
   * Interface for the prerequisites.
   */
  export interface Prerequisite extends Token {
    validatePrereq(...coursesTaken: CompletedCourse[]): Prerequisite[];
    toString(outer?: boolean): string; // Reminder to implement this for all implementations
    identifier: PrereqTypeIdentifier;
  }

  /**
   * Describes a course with no prerequisites
   */
  export const NONE: Prerequisite = {
    identifier: PrereqTypeIdentifier.NONE,
    toString: () => 'None',
    validatePrereq: (..._: CompletedCourse[] /*coursesTaken*/) => []
  };

  /**
   * Describes multiple prerequisites where all are required
   */
  export class And implements Prerequisite {
    public readonly requirements: Prerequisite[];
    public identifier: PrereqTypeIdentifier = PrereqTypeIdentifier.AND;

    constructor(...requirements: Prerequisite[]) {
      if (requirements.length === 0) {
        throw Error();
      }
      this.requirements = new Array<Prerequisite>().concat(requirements);
    }

    public validatePrereq(...coursesTaken: CompletedCourse[]): Prerequisite[] {
      let failingParts: Prerequisite[] = [];
      console.log('hit 1')
      for (let requirement of this.requirements) {
        if(!requirement.validatePrereq){
          requirement = getPrereqCopy(requirement);
        }
        console.log('requirement', requirement);
        if (requirement.validatePrereq(...coursesTaken).length !== 0) {
          failingParts.push(requirement);
        }
      }
      console.log('failingparts',failingParts);
      return failingParts;
    }

    public toString(outer: boolean = true): string {
      let previousRequirement: Prerequisite = NONE;
      let output: string = outer ? '' : '(';
      for (let i = 0; i < this.requirements.length; i++) {
        const requirement = this.requirements[i];

        if (
          previousRequirement instanceof Course &&
          requirement instanceof Course &&
          previousRequirement.courseID.department === requirement.courseID.department
        ) {
          output += requirement.courseID.courseNumber;
        } else {
          output += requirement.toString(false);
        }

        if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
          output += ', ';
        } else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
          output += ' and ';
        }
        previousRequirement = requirement;
      }
      output += outer ? '' : ')';
      return output;
    }
  }

  /**
   * Describes multiple prerequisites where only one is required
   */
  export class Or implements Prerequisite {
    public identifier: PrereqTypeIdentifier = PrereqTypeIdentifier.OR;

    public readonly requirements: Prerequisite[];

    constructor(...requirements: Prerequisite[]) {
      if (requirements.length === 0) {
        throw Error();
      }
      this.requirements = requirements;
    }

    public validatePrereq(...coursesTaken: CompletedCourse[]): Prerequisite[] {
      let failingParts: Prerequisite[] = [];
      for (let requirement of this.requirements) {
        if(!requirement.validatePrereq){
          requirement = getPrereqCopy(requirement);
        }
        if (requirement.validatePrereq(...coursesTaken).length === 0) {
          return [];
        } else {
          failingParts.push(requirement);
        }
      }
      return failingParts;
    }

    public toString(outer: boolean = true): string {
      let previousRequirement: Prerequisite = NONE;
      let output: string = outer ? '' : '(';
      for (let i = 0; i < this.requirements.length; i++) {
        const requirement = this.requirements[i];

        if (
          previousRequirement instanceof Course &&
          requirement instanceof Course &&
          previousRequirement.courseID.department === requirement.courseID.department
        ) {
          output += requirement.courseID.courseNumber;
        } else {
          output += requirement.toString(false);
        }

        if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
          output += ', ';
        } else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
          output += ' or ';
        }
        previousRequirement = requirement;
      }
      output += outer ? '' : ')';
      return output;
    }
  }

  /**
   * Describes a prerequisite course
   */
  export class Course implements Prerequisite {
    public identifier: PrereqTypeIdentifier = PrereqTypeIdentifier.COURSE;

    public courseID: CourseID;
    public readonly minGrade: Grade;

    constructor(courseID: CourseID, minGrade: Grade) {
      this.courseID = courseID;
      this.minGrade = minGrade;
    }

    public validatePrereq(...coursesTaken: CompletedCourse[]): Prerequisite[] {
      if(!this.courseID.equals){
        this.courseID = new CourseID(this.courseID.department, this.courseID.courseNumber);
      }
      for (const course of coursesTaken) {
        if (this.courseID.equals(course.courseID) && course.grade >= this.minGrade) {
          return [];
        }
      }
      return [this];
    }

    public toString(): string {
      return this.courseID.toString();
    }

    public static fromCourseName(courseName: string, minGrade: Grade = Grade.C): Course {
      return new Course(CourseID.fromCourseName(courseName), minGrade);
    }
  }

  export function getPrereqCopy(prereq: Prerequisite): Prerequisite{
    let prereqCopy: Prereq.Prerequisite;
    switch(prereq.identifier){
      case Prereq.PrereqTypeIdentifier.AND:
        prereqCopy = new Prereq.And(...(prereq as Prereq.And).requirements);
        break;
      case Prereq.PrereqTypeIdentifier.OR:
      prereqCopy = new Prereq.Or(...(prereq as Prereq.Or).requirements);
        break;
      case Prereq.PrereqTypeIdentifier.COURSE:
      let prereqCourse = prereq as Prereq.Course;
      prereqCopy = new Prereq.Course(prereqCourse.courseID, prereqCourse.minGrade);
        break;
      default:
      prereqCopy = Prereq.NONE;
        break;
    }
    return prereqCopy;
  }
}
