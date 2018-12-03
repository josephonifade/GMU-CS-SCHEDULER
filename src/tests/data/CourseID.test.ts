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

test("test the equals function", () => {
    expect(temp.equals(new CourseID('CS', 321)));
});

test("test the equals function", () => {
    expect(temp.equals(new CourseID('CS', 367)) == false);
});

test("testing toString function", () =>{
    expect(temp.toString().length>0);
});

test("testing toString function", () =>{
    expect(temp.department == "CS");
});

test("testing toString function", () =>{
    expect(temp.courseNumber == 321);
});