import {CourseID} from "./CourseID";
import {Grade} from "./Grade";

/**
 * A course completed by the user. Note that a completed course does not imply
 * that the course was PASSED.
 */
export class CompletedCourse {
    public readonly courseID: CourseID;
    public grade: Grade;
    public semester: number;

    constructor(courseID: CourseID, grade: Grade, semester: number) {
        this.courseID = courseID;
        this.grade = grade;
        this.semester = semester;
    }

    /**
     * Static method to generate a CompletedCourse object from a course name
     * (e.g. "CS 321")
     * @param courseName
     * @param grade
     */
    public static fromCourseName(courseName: string, grade: Grade, semester: number): CompletedCourse {
        return new CompletedCourse(CourseID.fromCourseName(courseName), grade, semester);
    }

    /**
     * Serializes a Completed Course
     * Format: [courseID:4.0:0]
     */
    public serialize() : string {
        let result = "[";
        result += this.courseID + ":" + this.grade.valueOf() + ":"+this.semester;
        return result + "]";
    }
}
