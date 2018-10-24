import { CourseID } from "./CourseID";
import { Grade } from "./Grade";

export class CompletedCourse{
    courseID: CourseID;
    grade: Grade;

    constructor(courseID: CourseID, grade: Grade){
        this.courseID = courseID;
        this.grade = grade;
    }

    static fromCourseName(courseName: string, grade: Grade): CompletedCourse {
        return new CompletedCourse(CourseID.fromCourseName(courseName), grade);
    }
}