import {Prereq} from '../../data/Prereq';
import { CompletedCourse } from '../../data/CompletedCourse';
import { CourseID } from '../../data/CourseID';
import {Grade} from '../../data/Grade';

const simpleAnd: Prereq.Prerequisite = new Prereq.And(new Prereq.Course(new CourseID('FAKE', 101), Grade.C), new Prereq.Course(new CourseID('FAKE', 102), Grade.C),new Prereq.Course(new CourseID('FAKE', 103), Grade.C),new Prereq.Course(new CourseID('FAKE', 105), Grade.C),);

const simpleOr: Prereq.Prerequisite = new Prereq.Or(new Prereq.Course(new CourseID('FAKE', 101), Grade.C), new Prereq.Course(new CourseID('FAKE', 102), Grade.C),new Prereq.Course(new CourseID('FAKE', 103), Grade.C),new Prereq.Course(new CourseID('FAKE', 105), Grade.C),);

const simpleCourse: Prereq.Prerequisite = new Prereq.Course(new CourseID('FAKE', 101), Grade.C);

const complexPrereq: Prereq.Prerequisite = new Prereq.And(new Prereq.Course(new CourseID('FAKE', 101), Grade.C), new Prereq.Or(new Prereq.Course(new CourseID('FAKE', 102), Grade.C), new Prereq.Course(new CourseID('FAKE', 103), Grade.C)), new Prereq.Course(new CourseID('FAKE', 104), Grade.C))

test('Prereq.NONE', () => {
    const completedCourses: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1)];

    expect(Prereq.NONE.validatePrereq(...completedCourses)).toHaveLength(0);
    expect(Prereq.NONE.toString()).toEqual('None');
});

test('Prereq.Course', () => {
    const completedCourses_accept: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1)];
    const completedCourses_rejectForCourse: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 102), Grade.A, 1)];
    const completedCourses_rejectForGrade: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 101), Grade.D, 1)];

    expect(simpleCourse.validatePrereq(...completedCourses_accept)).toHaveLength(0);
    expect(simpleCourse.validatePrereq(...completedCourses_rejectForCourse)).toEqual([simpleCourse]);
    expect(simpleCourse.validatePrereq(...completedCourses_rejectForGrade)).toEqual([simpleCourse]);

    expect(simpleCourse.toString()).toEqual('FAKE 101');
});

test('simpleAnd', () => {
    const completedCourses_accept: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 102), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 103), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 105), Grade.A, 1)]
    const completedCourses_reject: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 102), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 103), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 104), Grade.A, 1)]

    expect(simpleAnd.validatePrereq(...completedCourses_accept)).toHaveLength(0);
    expect(simpleAnd.validatePrereq(...completedCourses_reject)).toEqual([new Prereq.Course(new CourseID('FAKE', 105), Grade.C)]);

    expect(simpleAnd.toString()).toEqual('FAKE 101, 102, 103 and 105');
});

test('simpleOr', () => {
    const completedCourses_accept: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 104), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1)]
    const completedCourses_reject: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 104), Grade.A, 1)]

    expect(simpleOr.validatePrereq(...completedCourses_accept)).toHaveLength(0);
    expect(simpleOr.validatePrereq(...completedCourses_reject)).toEqual([new Prereq.Course(new CourseID('FAKE', 101), Grade.C), new Prereq.Course(new CourseID('FAKE', 102), Grade.C), new Prereq.Course(new CourseID('FAKE', 103), Grade.C), new Prereq.Course(new CourseID('FAKE', 105), Grade.C)]);

    expect(simpleOr.toString()).toEqual('FAKE 101, 102, 103 or 105');
});

test('complexPrereq', () => {
    const completedCourses_accept: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 104), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 103), Grade.A, 1)]
    const completedCourses_reject: CompletedCourse[] = [new CompletedCourse(new CourseID('FAKE', 104), Grade.A, 1), new CompletedCourse(new CourseID('FAKE', 101), Grade.A, 1)]

    expect(complexPrereq.validatePrereq(...completedCourses_accept)).toHaveLength(0);
    expect(complexPrereq.validatePrereq(...completedCourses_reject)).toEqual([new Prereq.Or(new Prereq.Course(new CourseID('FAKE', 102), Grade.C), new Prereq.Course(new CourseID('FAKE', 103), Grade.C))]);

    expect(complexPrereq.toString()).toEqual('FAKE 101, (FAKE 102 or 103) and FAKE 104');
});