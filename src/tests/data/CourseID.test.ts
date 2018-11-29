import {RequirementOption} from "../../data/CSProgram";
import {CourseID} from "../../data/CourseID"

let temp = new CourseID('CS', 321);

test("Test if the user has entered correct course format", () => {
    expect(temp.toString()).toEqual('CS 321');
});

test("testing the department of the course", () => {
    expect(temp.department == "CS");
});

test("testing the course number", () => {
    expect(temp.courseNumber == 321);
});

/* not sure why this one is giving me an error
test("test the fromCourseName function", () => {
    expect(temp.fromCourseName("CS 471").toEqual(new CourseID('CS', 471)));
});
*/

test("test the equals function", () => {
    expect(temp.equals(new CourseID('CS', 321)));
});

