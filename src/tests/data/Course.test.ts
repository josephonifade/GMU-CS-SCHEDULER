import {Grade} from "../../data/Grade";
import {Prereq} from "../../data/Prereq";
import {Course} from "../../data/Course";

let temp = new Course("CS", 105, 1, Grade.C, Prereq.NONE, 'Ethics', 'You must take');
let temp2 = new Course("CS", 321, 3, Grade.C, new Prereq.And(
      Prereq.Course.fromCourseName("CS 310"), new Prereq.Or(
          Prereq.Course.fromCourseName("ENGH 302"), new Prereq.And(
              Prereq.Course.fromCourseName("HNRS 110"), new Prereq.Or(
                  Prereq.Course.fromCourseName("HNRS 122"),
                  Prereq.Course.fromCourseName("HNRS 130"),
                 Prereq.Course.fromCourseName("HNRS 230"),
                  Prereq.Course.fromCourseName("HNRS 240"))))), 'Software Engineering', 'you must read');

test("testing the features of course function", () => {
    expect(temp.checkPassed(Grade.A));
});

test("testing the features of course function", () => {
    expect(temp.checkPassed(Grade.B));
});

test("testing the features of course function", () => {
    expect(temp.checkPassed(Grade.C));
});

test("testing the features of course function", () => {
    expect(temp.checkPassed(Grade.D) == false);
});

test("testing the features of course function", () => {
    expect(temp.checkPassed(Grade.F) == false);
});

test("testing the the serialize function", () => {
    let serialized = temp.serialize();
    expect("[CS 105:1:none:2:You must take]").toEqual(serialized);
});

test("testing the serialize function", () => {
    let serialized2 = temp2.serialize();
    expect("[CS 321:3:none:2:you must read]").toEqual(serialized2);
});

test("testing the prerequisties funciton", () => {
    expect(temp2.checkPrerequisites()).toBeFalsy();
});



