import { CompletedCourse } from "../../data/CompletedCourse";
import { Grade } from "../../data/Grade";


test("Test whether serialization will work for a given Completed Course 1", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.A, 5);
    let serialized = cCourse.serialize();
    expect("[CS 321:4:5]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 2", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.B, 0);
    let serialized = cCourse.serialize();
    expect("[CS 321:3:0]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 3", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.Cp,3);
    let serialized = cCourse.serialize();
    expect("[CS 321:2.33:3]").toEqual(serialized);
 });

 test("Test whether serialization will work for a given Completed Course 4", () => {
    let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.F,12);
    let serialized = cCourse.serialize();
    expect("[CS 321:0:12]").toEqual(serialized);
 });