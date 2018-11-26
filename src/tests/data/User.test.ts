import {User, Year} from "../../data/User";
import {Grade} from "../../data/Grade";
import {CompletedCourse} from "../../data/CompletedCourse";

let temp = new User(4, Year.Freshman, []);

test("Test if a user can graduate without taking classes", () => {
   expect(temp.checkCanGraduate()).toBeFalsy();
});

test("Test User Year feature for Freshman", () => {
   expect(temp.getYearFromValue("Freshman")).toEqual(Year.Freshman);
});

test("Test User Year feature for Sophomore", () => {
   expect(temp.getYearFromValue("Sophomore")).toEqual(Year.Sophomore);
});

test("Test User Year feature for Junior", () => {
   expect(temp.getYearFromValue("Junior")).toEqual(Year.Junior);
});

test("Test User Year feature for Senior", () => {
   expect(temp.getYearFromValue("Senior")).toEqual(Year.Senior);
});

test("Test User get a grade from a value A", () => {
   expect(temp.getGradeFromValue(4)).toEqual(Grade.A);
});

test("Test User get a grade from a value B", () => {
   expect(temp.getGradeFromValue(3)).toEqual(Grade.B);
});

test("Test User get a grade from a value C", () => {
   expect(temp.getGradeFromValue(2)).toEqual(Grade.C);
});

test("Test User get a grade from a value D", () => {
   expect(temp.getGradeFromValue(1)).toEqual(Grade.D);
});

test("Test User get a grade from a value F", () => {
   expect(temp.getGradeFromValue(0)).toEqual(Grade.F);
});

test("Test the serialization of the object is working as intended", () => {
   let tempCourses = [];
   tempCourses.push(CompletedCourse.fromCourseName("CS 321", Grade.A));
   tempCourses.push(CompletedCourse.fromCourseName("CS 321", Grade.B));
   tempCourses.push(CompletedCourse.fromCourseName("CS 321", Grade.C));
   let tempUser = new User(4, Year.Freshman, tempCourses);
   let serializedUser = tempUser.serialize();
   let expectedAnswer = "4:Freshman{[CS 321:4][CS 321:3][CS 321:2]}"
   expect(expectedAnswer).toEqual(serializedUser);
});

test("Test the de-serialization of the object is working as intended", () => {
   let serializedUserString = "4:Freshman{[CS 321:4][CS 321:3][CS 321:2]}"
   let serializedUserObject = User.loadFile(serializedUserString);
   expect(serializedUserObject.semestersRemaining).toEqual(4);
   expect(serializedUserObject.creditYear).toEqual(Year.Freshman);
   expect(serializedUserObject.coursesTaken.length).toEqual(3);
   // TODO: Check the contents of the actual loaded file itself
});