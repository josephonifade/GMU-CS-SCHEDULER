import {CourseID} from "./CourseID";

class CSProgram {
    constructor(readonly categories: Category[]) {}
}

class Category {
    constructor(readonly title: string, readonly requirements: Requirement[]) {}
}

class Requirement {
    constructor(readonly count: number, readonly options: RequirementOption[]) {}
}

export interface RequirementOption {}

class OptionList implements RequirementOption {
    constructor(readonly options: RequirementOption[]) {}
}

interface RuleOption extends RequirementOption {
    match(courseID: CourseID): boolean;
    name(): string;
}

const MATH_CS_300_PLUS: RuleOption = {
    match: (courseID: CourseID) => {
        if (courseID.department !== "MATH" && courseID.department !== "CS") {
            return false;
        }
        if (courseID.courseNumber <= 300) {
            return false;
        }
        if (courseID.department === "MATH" && courseID.courseNumber === 351) {
            return false;
        }
        return true;
    },
    name: () => "Any MATH or CS course numbered above 300 (except MATH 351)"
};

// https://catalog.gmu.edu/colleges-schools/engineering/computer-science/computer-science-bs/#requirementstext
export const CS_PROGRAM = new CSProgram([
    new Category("Computer Science Core", [
        new Requirement(0, [
            new CourseID("CS", 110),
            new CourseID("CS", 112),
            new CourseID("CS", 211),
            new CourseID("CS", 262),
            new CourseID("CS", 306),
            new CourseID("CS", 310),
            new CourseID("CS", 321),
            new CourseID("CS", 330),
            new CourseID("CS", 367),
            new CourseID("CS", 471),
            new CourseID("CS", 483)
        ])
    ]),
    new Category("Senior Computer Science", [
        new Requirement(1, [
            new CourseID("CS", 455),
            new CourseID("CS", 468),
            new CourseID("CS", 475)
        ]),
        new Requirement(4, [
            new CourseID("CS", 425),
            new CourseID("CS", 440),
            new CourseID("CS", 450),
            new CourseID("CS", 451),
            new CourseID("CS", 455),
            new CourseID("CS", 463),
            new CourseID("CS", 465),
            new CourseID("CS", 468),
            new CourseID("CS", 469),
            new CourseID("CS", 475),
            new CourseID("CS", 477),
            new CourseID("CS", 480),
            new CourseID("CS", 482),
            new CourseID("CS", 484),
            new CourseID("CS", 485),
            new CourseID("CS", 490),
            new CourseID("CS", 491),
            new CourseID("CS", 499),
            new OptionList([new CourseID("MATH", 446), new CourseID("OR", 481)])
        ])
    ]),
    new Category("Mathematics", [
        new Requirement(0, [
            new CourseID("MATH", 113),
            new CourseID("MATH", 114),
            new CourseID("MATH", 125),
            new CourseID("MATH", 203),
            new CourseID("MATH", 213)
        ])
    ]),
    new Category("Statistics", [new Requirement(0, [new CourseID("STAT", 344)])]),
    new Category("Computer Science-Related Courses", [
        new Requirement(2, [
            new CourseID("STAT", 354),
            new CourseID("OR", 335),
            new CourseID("OR", 441),
            new CourseID("OR", 442),
            new CourseID("ECE", 301),
            new CourseID("ECE", 431),
            new CourseID("ECE", 447),
            new CourseID("ECE", 450),
            new CourseID("ECE", 511),
            new CourseID("SWE", 432),
            new CourseID("SWE", 437),
            new CourseID("SWE", 443),
            new CourseID("SYST", 371),
            new CourseID("SYST", 470),
            new CourseID("PHIL", 371),
            new CourseID("PHIL", 376),
            new CourseID("ENGH", 388),
            MATH_CS_300_PLUS
        ])
    ]),
    // TODO:
    // new Category("Natural Science", [ // This is gonna take some work...
    //     new Requirement(),
    // ]),
    new Category("Communication", [new Requirement(0, [new CourseID("COMM", 100)])]),
    new Category("Mason Core - Written Communication", [
        new Requirement(0, [new CourseID("ENGH", 100), new CourseID("ENGH", 101)])
    ]),
    new Category("Mason Core - Literature", [
        new Requirement(1, [
            new CourseID("ARAB", 325),
            new CourseID("CHIN", 310),
            new CourseID("CHIN", 311),
            new CourseID("CHIN", 325),
            new CourseID("CHIN", 328),
            new CourseID("CLAS", 250),
            new CourseID("CLAS", 260),
            new CourseID("CLAS", 340),
            new CourseID("CLAS", 350),
            new CourseID("CLAS", 360),
            new CourseID("CLAS", 380),
            new CourseID("ENGH", 201),
            new CourseID("ENGH", 202),
            new CourseID("ENGH", 203),
            new CourseID("ENGH", 204),
            new CourseID("FREN", 325),
            new CourseID("FREN", 329),
            new CourseID("FRLN", 330),
            new CourseID("GERM", 325),
            new CourseID("ITAL", 320),
            new CourseID("ITAL", 325),
            new CourseID("JAPA", 340),
            new CourseID("KORE", 311),
            new CourseID("PHIL", 253),
            new CourseID("RELI", 235),
            new CourseID("RELI", 333),
            new CourseID("RUSS", 325),
            new CourseID("RUSS", 326),
            new CourseID("RUSS", 327),
            new CourseID("SPAN", 325)
        ])
    ]),
    new Category("Mason Core - Arts", [
        new Requirement(1, [
            new CourseID("ARTH", 101),
            new CourseID("ARTH", 102),
            new CourseID("ARTH", 103),
            new CourseID("ARTH", 200),
            new CourseID("ARTH", 201),
            new CourseID("ARTH", 203),
            new CourseID("ARTH", 204),
            new CourseID("ARTH", 206),
            new CourseID("ARTH", 321),
            new CourseID("ARTH", 322),
            new CourseID("ARTH", 324),
            new CourseID("ARTH", 333),
            new CourseID("ARTH", 334),
            new CourseID("ARTH", 335),
            new CourseID("ARTH", 340),
            new CourseID("ARTH", 341),
            new CourseID("ARTH", 342),
            new CourseID("ARTH", 344),
            new CourseID("ARTH", 345),
            new CourseID("ARTH", 350),
            new CourseID("ARTH", 360),
            new CourseID("ARTH", 362),
            new CourseID("ARTH", 370),
            new CourseID("ARTH", 372),
            new CourseID("ARTH", 373),
            new CourseID("ARTH", 376),
            new CourseID("AVT", 103),
            new CourseID("AVT", 104),
            new CourseID("AVT", 215),
            new CourseID("AVT", 222),
            new CourseID("AVT", 232),
            new CourseID("AVT", 243),
            new CourseID("AVT", 252),
            new CourseID("AVT", 253),
            new CourseID("AVT", 262),
            new CourseID("AVT", 272),
            new CourseID("AVT", 385),
            new CourseID("DANC", 101),
            new CourseID("DANC", 119),
            new CourseID("DANC", 125),
            new CourseID("DANC", 131),
            new CourseID("DANC", 145),
            new CourseID("DANC", 161),
            new CourseID("DANC", 225),
            new CourseID("DANC", 231),
            new CourseID("DANC", 245),
            new CourseID("DANC", 301),
            new CourseID("DANC", 325),
            new CourseID("DANC", 331),
            new CourseID("DANC", 345),
            new CourseID("DANC", 390),
            new CourseID("DANC", 391),
            new CourseID("DANC", 425),
            new CourseID("DANC", 445),
            new CourseID("ENGH", 370),
            new CourseID("ENGH", 371),
            new CourseID("ENGH", 372),
            new CourseID("ENGH", 396),
            new CourseID("FAVS", 225),
            new CourseID("GAME", 101),
            new CourseID("INTS", 200),
            new CourseID("INTS", 245),
            new CourseID("INTS", 346),
            new CourseID("INTS", 446),
            new CourseID("MUSI", 100),
            new CourseID("MUSI", 101),
            new CourseID("MUSI", 102),
            new CourseID("MUSI", 107),
            new CourseID("MUSI", 280),
            new CourseID("MUSI", 301),
            new CourseID("MUSI", 302),
            new CourseID("MUSI", 380),
            new CourseID("MUSI", 381),
            new CourseID("MUSI", 382),
            new CourseID("MUSI", 383),
            new CourseID("MUSI", 385),
            new CourseID("MUSI", 387),
            new CourseID("MUSI", 389),
            new CourseID("MUSI", 485),
            new CourseID("PHIL", 156),
            new CourseID("THR", 101),
            new CourseID("THR", 150),
            new CourseID("THR", 151),
            new CourseID("THR", 210),
            new CourseID("THR", 230),
            new CourseID("THR", 395),
            new CourseID("THR", 411),
            new CourseID("THR", 412)
        ])
    ]),
    new Category("Mason Core - Western Civilization/World History", [
        new Requirement(1, [
            // This whole thing is semantiacally identical to one long list of courses, but this more closely resembles the catalog
            new OptionList([
                new CourseID("HIST", 100),
                // TODO: Need to check if transfer student
                new CourseID("HIST", 101),
                new CourseID("HIST", 102),
                new CourseID("HIST", 301),
                new CourseID("HIST", 302),
                new CourseID("HIST", 304),
                new CourseID("HIST", 305),
                new CourseID("HIST", 306),
                new CourseID("HIST", 308),
                new CourseID("HIST", 309),
                new CourseID("HIST", 312),
                new CourseID("HIST", 314),
                new CourseID("HIST", 322),
                new CourseID("HIST", 388),
                new CourseID("HIST", 436),
                new CourseID("HIST", 480)
            ]),
            new OptionList([
                new CourseID("HIST", 125),
                // TODO: Need to check if transfer student
                new CourseID("HIST", 202),
                new CourseID("HIST", 387)
            ])
        ])
    ]),
    new Category("Mason Core - Social and Behavioral Sciences", [
        new Requirement(1, [
            new CourseID("AFAM", 200),
            new CourseID("ANTH", 114),
            new CourseID("ANTH", 120),
            new CourseID("ANTH", 135),
            new CourseID("ANTH", 363),
            new CourseID("ANTH", 372),
            new CourseID("ANTH", 396),
            new CourseID("BUS", 100)
        ])
    ])
]);
