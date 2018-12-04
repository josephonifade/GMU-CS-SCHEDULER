import {CourseID} from '../../data/CourseID';
import {OptionList, RuleOption} from '../../data/CSProgram';

const testRuleOption: RuleOption = {
    match: (courseID: CourseID) => {
        return courseID.department == 'TEST';
    },
    toString: () => 'Test'
};

test("RuleOption - match", () => {
    expect(testRuleOption.match(new CourseID('TEST', 101))).toBeTruthy();
    expect(testRuleOption.match(new CourseID('TST', 101))).toBeFalsy();
});

test("OptionList - toString() when all are required", () => {
    const fakeOptionListAll: OptionList = new OptionList(0, [new CourseID('FAKE', 101), new CourseID('FAKE', 102),new CourseID('FAKE', 103),new CourseID('FAKE', 105),]);

    expect(fakeOptionListAll.toString()).toEqual('(FAKE 101 AND FAKE 102 AND FAKE 103 AND FAKE 105)');
});

test("OptionList - toString() when not all are required", () => {
    const fakeOptionListAll: OptionList = new OptionList(2, [new CourseID('FAKE', 101), new CourseID('FAKE', 102),new CourseID('FAKE', 103),new CourseID('FAKE', 105),]);

    expect(fakeOptionListAll.toString()).toEqual('(2 of: FAKE 101 OR FAKE 102 OR FAKE 103 OR FAKE 105)');
});