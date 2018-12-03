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
    console.log('course.getFailingprereq ng');
    return this.getFailingPrerequisites(
      ...coursesTaken.map((courseID) => {
        return new CompletedCourse(new CourseID(courseID.department, courseID.courseNumber), Grade.A);
      })
    );
  }

  public checkPassed(grade: Grade): boolean {
    return grade >= this.minGrade;
  }
}
