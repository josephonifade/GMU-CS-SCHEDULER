import { User, Year } from "./User";
import {Course, catalog, CS321} from "./Course"

export interface Rule {
    checkRule(user: User): boolean;
    errorMessage(): string;
}

export class CreditRule implements Rule {

    checkRule(user: User): boolean{
        let creditTotal: number = 0;

        for(let courseTaken of user.coursesTaken){
            let course = catalog.get(courseTaken.courseID);
            if(course == null){
                continue;
            }
            if (course.checkPrerequisites() && course.checkPassed(courseTaken.grade)){
                creditTotal += course.credits;
            }
        }
        
        return creditTotal >= 120;
    }

    errorMessage(): string{
        return "You have less than 120 credits.";
    }
}