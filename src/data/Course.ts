import {CompletedCourse} from './CompletedCourse';
import {CourseID} from './CourseID';
import {Grade} from './Grade';
import {Prereq} from './Prereq';

/**
 * A course to be included in the catalog.
 */
export class Course {
  public readonly id: CourseID;
  public readonly credits: number;
  public readonly prerequisites: Prereq.Prerequisite;
  public readonly minGrade: Grade;
  public readonly title?: string;
  public readonly description?: string;

  constructor(
    department: string,
    courseNumber: number,
    credits: number,
    minGrade: Grade,
    prerequisites: Prereq.Prerequisite,
    title: string = '',
    description: string = ''
  ) {
    this.id = new CourseID(department, courseNumber);
    this.credits = credits;
    this.minGrade = minGrade;
    this.prerequisites = prerequisites;
    this.title = title;
    this.description = description;
  }

  public getFailingPrerequisites(...coursesTaken: CompletedCourse[]): Prereq.Prerequisite[] {
    console.log('getfailingprereq')
    return this.prerequisites.validatePrereq(...coursesTaken);
  }

  public checkPrerequisites(...coursesTaken: CompletedCourse[]): boolean {
    return this.getFailingPrerequisites(...coursesTaken).length === 0;
  }

  public getFailingPrerequisitesNoGrade(...coursesTaken: CourseID[]): Prereq.Prerequisite[] {
    return this.getFailingPrerequisites(
      ...coursesTaken.map((courseID) => {
        return new CompletedCourse(new CourseID(courseID.department, courseID.courseNumber), Grade.A, 1);
      })
    );
  }

  public checkPassed(grade: Grade): boolean {
    return grade >= this.minGrade;
  }

      /**
     * Serializes the current course
     */
    public serialize(): string {
      let result = "[";
      result += this.id + ":";
      result += this.credits + ":";
      result += "none" + ":"; // TODO: Design a way to serialize Pre Reqs
      result += this.minGrade.valueOf() + ":";
      result += this.description + "]";
      return result;
  }
}
