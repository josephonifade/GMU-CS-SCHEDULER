import { CompletedCourse } from "../../data/CompletedCourse";
import { Grade } from "../../data/Grade";


test("Test whether serialization will work for a given Completed Course 1", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.A);
    let serialized = cCourse.serialize();
    expect("[CS 321:4]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 2", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.B);
    let serialized = cCourse.serialize();
    expect("[CS 321:3]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 3", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.Cp);
    let serialized = cCourse.serialize();
    expect("[CS 321:2.33]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 4", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.F);
    let serialized = cCourse.serialize();
    expect("[CS 321:0]").toEqual(serialized);
 });