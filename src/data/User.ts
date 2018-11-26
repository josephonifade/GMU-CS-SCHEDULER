import {CompletedCourse} from "./CompletedCourse";
import {catalog} from "./Course";
import {rules} from "./Rule";
import * as fs from "fs";
import { Grade } from "./Grade";

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
     * FORMAT: SemestersRemaining:year{course1...courseN}
     */
    public serialize(): string {
        let result = "";
        result += this.semestersRemaining + ":" + this.year +"{"
        for (let course of this.coursesTaken) {
            result += course.serialize();
        }
        return result+"}";
    }

    /**
     * Save a .txt file with the serialized componenets of this program
     */
    public saveFile(): boolean {
        let fileContents = this.serialize();
        fs.writeFile("/tmp/test", fileContents, function(err) {
            if(err) {
                console.log(err);
                return false;
            }

            console.log("The file was saved!");
            return true;
        });
        return true;
    }

    /**
     * Load data from a .txt file
     */
    public static loadFile(fileContents : string): User {

        let tempUser = new User(6, Year.Freshman, []);
        // TODO: Make this come from a file
        let semestersRemaining = fileContents.substring(0, fileContents.indexOf(':'));
        fileContents = fileContents.substring(fileContents.indexOf(':')+1);
        let year = fileContents.substring(0, fileContents.indexOf(':'));
        fileContents = fileContents.substring(fileContents.indexOf(':')+1);

        let completedCoursesFromFile = []
        // Get all the completed courses
        while(fileContents.indexOf('[') != -1) {

            // TODO: Should probably delegate this to a helper function in CompletedCourse called deserialize
            let currCourseParse = fileContents.substring(fileContents.indexOf('[')+1, fileContents.indexOf(']'))
            let currCourseID = currCourseParse.substring(0, currCourseParse.indexOf(":"));
            currCourseParse = currCourseParse.substring(currCourseParse.indexOf(':')+1);

            let currCourseGrade = +currCourseParse.substring(0, currCourseParse.indexOf(':'));
            currCourseParse = currCourseParse.substring(currCourseParse.indexOf(':')+1);
            
            let semester = +currCourseParse.substring(currCourseParse.indexOf(':')+1, currCourseParse.indexOf(']'));
            
            let currCompletedCourse = CompletedCourse.fromCourseName(currCourseID, tempUser.getGradeFromValue(currCourseGrade), semester);
            completedCoursesFromFile.push(currCompletedCourse);
            // start from the next 
            fileContents = fileContents.substring(fileContents.indexOf(']')+1);
        }
        
        let user = new User(+semestersRemaining, tempUser.getYearFromValue(year), completedCoursesFromFile)

        return user;
    }
    /**
     * Get a Year enum from it's string value 
     */
    public getYearFromValue(value : string) : Year {
        if(value == "Freshman")
            return Year.Freshman;
        if(value == "Sophomore")
            return Year.Sophomore;
        if(value == "Junior")
            return Year.Junior;
        return Year.Senior;
    }

    /**
     * Converts a grade value to an enumeration
     */
    public getGradeFromValue(value : number) : Grade {
        if(value == 4.0)
            return Grade.Ap;
        if(value == 3.67)
            return Grade.Am;
        if(value == 3.33)
            return Grade.Bp
        if(value == 3.0)
            return Grade.B;
        if(value == 2.67)
            return Grade.Cm;
        if(value == 2.33)
            return Grade.Cp;
        if(value == 2.0)
            return Grade.C;
        if(value == 1.67)
            return Grade.Cm;
        if(value == 1.0)
            return Grade.D;
        return Grade.F;
    }
}
