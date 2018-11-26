import {User, Year} from "../../data/User";
import {Grade} from "../../data/Grade";

let temp = new User(0, Year.Freshman, []);

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