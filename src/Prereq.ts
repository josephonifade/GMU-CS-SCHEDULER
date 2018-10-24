import {CourseID} from "./CourseID"
import {Grade} from "./Grade"
import { CompletedCourse } from "./CompletedCourse";

export namespace Prereq {
    
    export interface Prerequisite {
        validatePrereq(...coursesTaken: CompletedCourse[]): boolean;
        toString(outer?: boolean): string; //Reminder to implement this for all implementations
    }

    export const NONE : Prerequisite = {validatePrereq: (...coursesTaken: CompletedCourse[]) => {return true;}, toString: ()=>{return "None"}};

    export class And implements Prerequisite{
        requirements: Prerequisite[];

        constructor(...requirements: Prerequisite[]){
            if(requirements.length == 0){
                throw Error();
            }
            this.requirements = requirements;
        }

        validatePrereq(...coursesTaken: CompletedCourse[]): boolean{
            for(let requirement of this.requirements){
                if(!requirement.validatePrereq(...coursesTaken))
                    return false;
            }
            return true;
        }

        toString(outer : boolean = true): string{
            let previousRequirement: Prerequisite = NONE;
            let output: string = outer ? "" : "(";
            for(let i = 0; i < this.requirements.length; i++){
                let requirement = this.requirements[i];

                if(previousRequirement instanceof Course && requirement instanceof Course && previousRequirement.courseID.department === requirement.courseID.department){
                    output += requirement.courseID.number;
                }else{
                    output += requirement.toString(false);
                }

                if(i < this.requirements.length - 2){
                    output += ", ";
                }else if(i == this.requirements.length - 2){
                    output += " and ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        }

    }

    export class Or implements Prerequisite{
        requirements: Prerequisite[];

        constructor(...requirements: Prerequisite[]){
            if(requirements.length == 0){
                throw Error();
            }
            this.requirements = requirements;
        }

        validatePrereq(...coursesTaken: CompletedCourse[]): boolean{
            for(let requirement of this.requirements){
                if(requirement.validatePrereq(...coursesTaken))
                    return true;
            }
            return false;
        }

        toString(outer: boolean = true): string{
            let previousRequirement: Prerequisite = NONE;
            let output: string = outer ? "" : "(";
            for(let i = 0; i < this.requirements.length; i++){
                let requirement = this.requirements[i];

                if(previousRequirement instanceof Course && requirement instanceof Course && previousRequirement.courseID.department === requirement.courseID.department){
                    output += requirement.courseID.number;
                }else{
                    output += requirement.toString(false);
                }

                if(i < this.requirements.length - 2){
                    output += ", ";
                }else if(i == this.requirements.length - 2){
                    output += " or ";
                }
                previousRequirement = requirement;
            }
            output += outer ? "" : ")";
            return output;
        }
    }

    export class Course implements Prerequisite {
        courseID: CourseID;
        minGrade: Grade;

        constructor(courseID: CourseID, minGrade: Grade) {
            this.courseID = courseID;
            this.minGrade = minGrade;
        }

        static fromCourseName(courseName: string, minGrade: Grade = Grade.C): Course{
            return new Course(CourseID.fromCourseName(courseName), minGrade);
        }

        validatePrereq(...coursesTaken: CompletedCourse[]): boolean{
            for(let course of coursesTaken){
                if(this.courseID.equals(course.courseID) && course.grade >= this.minGrade){
                    return true;
                }
            }
            return false;
        }

        toString(): string{
            let output: string = this.courseID.toString();
            return output;
        }
    }
}