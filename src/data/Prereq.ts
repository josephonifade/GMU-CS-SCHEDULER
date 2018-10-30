import { CompletedCourse } from "./CompletedCourse";
import {CourseID} from "./CourseID";
import {Grade} from "./Grade";

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
export namespace Prereq {

    const TO_STRING_DISTANCE_FOR_COMMA: number = 2;

    /**
     * Interface for the prerequisites.
     */
    export interface Prerequisite {
        validatePrereq(...coursesTaken: CompletedCourse[]): boolean;
        toString(outer?: boolean): string; // Reminder to implement this for all implementations
    }

    /**
     * Describes a course with no prerequisites
     */
    export const NONE: Prerequisite = {toString: () => "None",
    validatePrereq: (..._: CompletedCourse[] /*coursesTaken*/) => true};

    /**
     * Describes multiple prerequisites where all are required
     */
    export class And implements Prerequisite {
        public readonly requirements: Prerequisite[];

        constructor(...requirements: Prerequisite[]) {
            if (requirements.length === 0) {
                throw Error();
            }
            this.requirements = requirements;
        }

        public validatePrereq(...coursesTaken: CompletedCourse[]): boolean {
            for (const requirement of this.requirements) {
                if (!requirement.validatePrereq(...coursesTaken)) {
                    return false;
                }
            }
            return true;
        }

        public toString(outer: boolean = true): string {
            let previousRequirement: Prerequisite = NONE;
            let output: string = outer ? "" : "(";
            for (let i = 0; i < this.requirements.length; i++) {
                const requirement = this.requirements[i];

                if (previousRequirement instanceof Course && requirement instanceof Course
                    && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.courseNumber;
                } else {
                    output += requirement.toString(false);
                }

                if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += ", ";
                } else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += " and ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        }

    }

    /**
     * Describes multiple prerequisites where only one is required
     */
    export class Or implements Prerequisite {
        public readonly requirements: Prerequisite[];

        constructor(...requirements: Prerequisite[]) {
            if (requirements.length === 0) {
                throw Error();
            }
            this.requirements = requirements;
        }

        public validatePrereq(...coursesTaken: CompletedCourse[]): boolean {
            for (const requirement of this.requirements) {
                if (requirement.validatePrereq(...coursesTaken)) {
                    return true;
                }
            }
            return false;
        }

        public toString(outer: boolean = true): string {
            let previousRequirement: Prerequisite = NONE;
            let output: string = outer ? "" : "(";
            for (let i = 0; i < this.requirements.length; i++) {
                const requirement = this.requirements[i];

                if (previousRequirement instanceof Course && requirement instanceof Course
                    && previousRequirement.courseID.department === requirement.courseID.department) {
                    output += requirement.courseID.courseNumber;
                } else {
                    output += requirement.toString(false);
                }

                if (i < this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += ", ";
                } else if (i === this.requirements.length - TO_STRING_DISTANCE_FOR_COMMA) {
                    output += " or ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        }
    }

    /**
     * Describes a prerequisite course
     */
    export class Course implements Prerequisite {
        public readonly courseID: CourseID;
        public readonly minGrade: Grade;

        constructor(courseID: CourseID, minGrade: Grade) {
            this.courseID = courseID;
            this.minGrade = minGrade;
        }

        public validatePrereq(...coursesTaken: CompletedCourse[]): boolean {
            for (const course of coursesTaken) {
                if (this.courseID.equals(course.courseID) && course.grade >= this.minGrade) {
                    return true;
                }
            }
            return false;
        }

        public toString(): string {
            return this.courseID.toString();
        }

        public static fromCourseName(courseName: string, minGrade: Grade = Grade.C): Course {
            return new Course(CourseID.fromCourseName(courseName), minGrade);
        }
    }
}
