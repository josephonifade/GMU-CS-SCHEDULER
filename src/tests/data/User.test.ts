import {CompletedCourse} from "../../data/CompletedCourse";
import {Course} from "../../data/Course";
import {CourseID} from "../../data/CourseID";
import {Grade} from "../../data/Grade";
import {Prereq} from "../../data/Prereq";
import {CREDIT_RULE, TOTAL_CREDIT_REQUIREMENT} from "../../data/Rule";
import {User, Year} from "../../data/User";


test("Test if a user can graduate without taking classes", () => {
   let temp = new User(0, Year.Freshman, []);
   expect(temp.checkCanGraduate()).toBeFalsy();
});