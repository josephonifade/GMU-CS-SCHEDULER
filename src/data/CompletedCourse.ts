import {CourseID} from './CourseID';
import {Grade} from './Grade';

/**
 * A course completed by the user. Note that a completed course does not imply
 * that the course was PASSED.
 */
export class CompletedCourse {
  public readonly courseID: CourseID;
  public grade: Grade;

  constructor(courseID: CourseID, grade: Grade) {
    this.courseID = courseID;
    this.grade = grade;
  }

  /**
   * Static method to generate a CompletedCourse object from a course name
   * (e.g. "CS 321")
   * @param courseName
   * @param grade
   */
  public static fromCourseName(courseName: string, grade: Grade): CompletedCourse {
    return new CompletedCourse(CourseID.fromCourseName(courseName), grade);
  }

  
}
