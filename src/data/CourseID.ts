import {RequirementOption} from './CSProgram';

/**
 * The identifying information of a course -- the department and number
 */
export class CourseID implements RequirementOption {
  public readonly department: string;
  public readonly courseNumber: number;

  constructor(department: string, courseNumber: number) {
    this.department = department;
    this.courseNumber = courseNumber;
  }

  public equals(other: CourseID): boolean {
    return this.department === other.department && this.courseNumber === other.courseNumber;
  }

  public toString(): string {
    return this.department + ' ' + this.courseNumber;
  }

  /**
   * Static method to parse a CourseID object from a course name
   * (e.g. "CS 321")
   */
  public static fromCourseName(courseName: string): CourseID {
    const regex = /\d/g
    const parts: string[] = courseName.trim().split(regex);
    const department: string = parts[0];
    const courseNumber: number = Number(parts[1]);

    return new CourseID(department, courseNumber);
  }
}
