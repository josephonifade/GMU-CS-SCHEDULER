import {CourseID} from "./CourseID"
import {Course, catalog, CS321} from "./Course"
import {Prereq} from "./Prereq"
import { User, Year } from "./User";
import { CompletedCourse } from "./CompletedCourse";
import { Grade } from "./Grade";

// var valid = cs321.checkPrerequisites(CourseID.fromCourseName("HNRS 110"), CourseID.fromCourseName("CS 310"), CourseID.fromCourseName("HNRS 230"));


let evan: User = new User(4, Year.Junior, Year.Junior, [CompletedCourse.fromCourseName("CS 310", Grade.Am), CompletedCourse.fromCourseName("ENGH 302", Grade.B)]);

console.log(evan);
console.log(CS321.prerequisites.toString())
console.log(CS321.checkPrerequisites(...evan.coursesTaken));

