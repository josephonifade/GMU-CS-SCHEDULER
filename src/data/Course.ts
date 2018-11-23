import {CompletedCourse} from "./CompletedCourse";
import {CourseID} from "./CourseID";
import {Grade} from "./Grade";
import {Prereq} from "./Prereq";

/**
 * A course to be included in the catalog.
 */
export class Course {
    public readonly id: CourseID;
    public readonly credits: number;
    public readonly prerequisites: Prereq.Prerequisite;
    public readonly minGrade: Grade;
    public readonly description?: string;

    constructor(
        department: string,
        courseNumber: number,
        credits: number,
        minGrade: Grade,
        prerequisites: Prereq.Prerequisite,
        description: string = ""
    ) {
        this.id = new CourseID(department, courseNumber);
        this.credits = credits;
        this.minGrade = minGrade;
        this.prerequisites = prerequisites;
        this.description = description;
    }

    public checkPrerequisites(...coursesTaken: CompletedCourse[]): boolean {
        return this.prerequisites.validatePrereq(...coursesTaken);
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

export let catalog: Map<CourseID, Course> = new Map<CourseID, Course>();

const CS105: Course = new Course("CS", 105, 1, Grade.C, Prereq.NONE);

export const CS321: Course = new Course(
    "CS",
    321,
    3,
    Grade.C,
    new Prereq.And(
        Prereq.Course.fromCourseName("CS 310"),
        new Prereq.Or(
            Prereq.Course.fromCourseName("ENGH 302"),
            new Prereq.And(
                Prereq.Course.fromCourseName("HNRS 110"),
                new Prereq.Or(
                    Prereq.Course.fromCourseName("HNRS 122"),
                    Prereq.Course.fromCourseName("HNRS 130"),
                    Prereq.Course.fromCourseName("HNRS 230"),
                    Prereq.Course.fromCourseName("HNRS 240")
                )
            )
        )
    )
);

const ENGH302: Course = new Course("ENGH", 302, 4, Grade.C, Prereq.NONE);

catalog.set(CS105.id, CS105);
catalog.set(CS321.id, CS321);
catalog.set(ENGH302.id, ENGH302);
