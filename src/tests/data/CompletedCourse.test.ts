import { CompletedCourse } from "../../data/CompletedCourse";
import { Grade } from "../../data/Grade";


test("Test whether serialization will work for a given Completed Course", () => {
   let cCourse = CompletedCourse.fromCourseName("CS 321", Grade.A);
   let serialized = cCourse.serialize();
   expect(serialized === "[CS 321:4.0]").toBeTruthy();
});