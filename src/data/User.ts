import {CompletedCourse} from "./CompletedCourse";
import {catalog} from "./Course";
import {rules} from "./Rule";

/**
 * The year name of the user
 */
export enum Year {
    Freshman = "Freshman",
    Sophomore = "Sophomore",
    Junior = "Junior",
    Senior = "Senior"
}

/**
 * The user currently using the application
 */
export class User {
    public semestersRemaining: number;
    public year: Year;
    public creditYear: Year;
    public coursesTaken: CompletedCourse[];

    constructor(
        semestersRemaining: number,
        year: Year,
        coursesTaken: CompletedCourse[]
    ) {
        this.semestersRemaining = semestersRemaining;
        this.year = year;
        
        // Dynamically generate the credit classification
        let credits = 0;
        for (let course of coursesTaken){
            let x = course.courseID.toString; // need to change this to read the credits
            x = x.toString;
            credits += 3; // TODO: This needs to be changed to the actually credits of the class.
                          // Assuming 3 credits for each class for the sake of demoing
        }
        this.creditYear = Year.Senior; // TODO: override all files that call the constructor to accoutn for this
        if(credits < 30)
            this.creditYear = Year.Freshman;
        else if(credits < 60)
            this.creditYear = Year.Sophomore;
        else if(credits < 90)
            this.creditYear = Year.Junior;

        this.coursesTaken = coursesTaken;
    }

    /**
     * Checks if the user can graduate by evaluating their class record
     * (courses taken & grades) against the list of rules specified in Rule.ts.
     */
    public checkCanGraduate(): boolean {
        for (const rule of rules) {
            if (!rule.checkRule(this, catalog)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Serializes all the user information
     */
    private serialize(): string {
        
    }
}
