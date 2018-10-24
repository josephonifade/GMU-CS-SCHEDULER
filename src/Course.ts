import {CourseID} from "./CourseID"
import {Prereq} from "./Prereq"
import { CompletedCourse } from "./CompletedCourse";
import { Grade } from "./Grade";

export class Course {
    id: CourseID;
    credits: number;
    prerequisites: Prereq.Prerequisite;
    minGrade: Grade;
    description?: string;

    constructor(department: string, number: number, credits: number, minGrade: Grade, prerequisites: Prereq.Prerequisite, description: string = ""){
        this.id = new CourseID(department, number);
        this.credits = credits;
        this.minGrade = minGrade;
        this.prerequisites = prerequisites;
        this.description = description;
    }

    checkPrerequisites(...coursesTaken: CompletedCourse[]) : boolean{
        return this.prerequisites.validatePrereq(...coursesTaken);
    }

    checkPassed(grade: Grade){
        return grade >= this.minGrade;
    }
}

export let catalog: Map<CourseID, Course> = new Map<CourseID, Course>();

const CS105: Course = new Course("CS", 105, 1, Grade.Cm, Prereq.NONE);

export const CS321: Course = new Course("CS", 321, 3, Grade.Cm, new Prereq.And(
    Prereq.Course.fromCourseName("CS 310"), new Prereq.Or(
        Prereq.Course.fromCourseName("ENGH 302"), new Prereq.And(
            Prereq.Course.fromCourseName("HNRS 110"), new Prereq.Or(
                Prereq.Course.fromCourseName("HNRS 122"),
                Prereq.Course.fromCourseName("HNRS 130"),
                Prereq.Course.fromCourseName("HNRS 230"),
                Prereq.Course.fromCourseName("HNRS 240"))))));

const ENGH302: Course = new Course("ENGH", 302, 4, Grade.Cm, Prereq.NONE);


catalog.set(CS105.id, CS105);
catalog.set(CS321.id, CS321);
catalog.set(ENGH302.id, ENGH302);