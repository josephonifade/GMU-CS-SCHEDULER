export class CourseID{
    department: string;
    number: number;

    constructor(department: string, number: number){
        this.department = department;
        this.number = number;
    }

    static fromCourseName(courseName: string): CourseID{
        let parts : string[] = courseName.trim().split(" ");
        let department : string = parts[0];
        let number : number = Number(parts[1]);

        return new CourseID(department, number);
    }

    equals(other: CourseID): boolean{
        return this.department == other.department && this.number == other.number;
    }

    toString(): string{
        return this.department + " " + this.number;
    }
}