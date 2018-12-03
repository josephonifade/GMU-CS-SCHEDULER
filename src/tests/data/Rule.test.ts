import {CompletedCourse} from "../../data/CompletedCourse";
import {Course} from "../../data/Course";
import {CourseID} from "../../data/CourseID";
import {Grade} from "../../data/Grade";
import {Prereq} from "../../data/Prereq";
import {CREDIT_RULE, TOTAL_CREDIT_REQUIREMENT} from "../../data/Rule";
import {User, Year} from "../../data/User";

const fakeCourseID: CourseID = new CourseID("Fake", 101);
const fakeCatalog: Map<string, Course> = new Map<string, Course>();
const fakeCompletedCourse: CompletedCourse = new CompletedCourse(fakeCourseID, Grade.Bm, 0);
const fakeUser: User = new User(4, Year.Sophomore, Year.Sophomore, [fakeCompletedCourse]);

beforeEach(() => {
    fakeCatalog.clear();
});

test("CreditRule prints something out", () => {
    expect(CREDIT_RULE.errorMessage().length).toBeGreaterThan(0);
});

test("CreditRule checkRule fails if we have less than the required credits", () => {
    const fakeCourse: Course = new Course(
        fakeCourseID.department,
        fakeCourseID.courseNumber,
        TOTAL_CREDIT_REQUIREMENT - 1,
        Grade.C,
        Prereq.NONE
    );
    fakeCatalog.set(JSON.stringify(fakeCourseID), fakeCourse);
    expect(CREDIT_RULE.checkRule(fakeUser, fakeCatalog)).toBeFalsy();
});

test("CreditRule checkRule succeeds if we have exactly the required credits", () => {
    const fakeCourse: Course = new Course(
        fakeCourseID.department,
        fakeCourseID.courseNumber,
        TOTAL_CREDIT_REQUIREMENT,
        Grade.C,
        Prereq.NONE
    );
    fakeCatalog.set(JSON.stringify(fakeCourseID), fakeCourse);
    expect(CREDIT_RULE.checkRule(fakeUser, fakeCatalog)).toBeTruthy();
});

test("CreditRule checkRule succeeds if we have more than the required credits", () => {
    const fakeCourse: Course = new Course(
        fakeCourseID.department,
        fakeCourseID.courseNumber,
        TOTAL_CREDIT_REQUIREMENT + 1,
        Grade.C,
        Prereq.NONE
    );
    fakeCatalog.set(JSON.stringify(fakeCourseID), fakeCourse);
    expect(CREDIT_RULE.checkRule(fakeUser, fakeCatalog)).toBeTruthy();
});