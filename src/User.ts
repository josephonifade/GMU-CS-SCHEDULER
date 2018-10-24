import { CompletedCourse } from "./CompletedCourse";
import { Rule, CreditRule } from "./Rule";

export enum Semester {
    Fall2016 = 0
}
export enum Year {
    Freshman = "Freshman",
    Sophomore = "Sophomore",
    Junior = "Junior",
    Senior = "Senior"
}

export class User {
    static rules: Rule[] = [new CreditRule()];

    semestersRemaining: number;
    year: Year;
    creditYear: Year;
    coursesTaken: CompletedCourse[];

    constructor(semestersRemaining: number, year: Year, creditYear: Year, coursesTaken: CompletedCourse[]){
        this.semestersRemaining = semestersRemaining;
        this.year = year;
        this.creditYear = creditYear;
        this.coursesTaken = coursesTaken;
    }

    checkCanGraduate(): boolean {
        for(let rule of User.rules){
            if(!rule.checkRule(this)){
                return false;
            }
        }
        return true;
    }

}