import {Course} from './data/Course';
import {CourseID} from './data/CourseID';
import {CS_PROGRAM, OptionList, RequirementOption} from './data/CSProgram';
import {Grade} from './data/Grade';
import {Prereq} from './data/Prereq';
import {AndOperator, OrOperator, Token} from './data/ScraperTypes';
const catalog: Map<string, Course> = new Map<string, Course>();

const search = require('cheerio');

function run(): void {
  const courseList: CourseID[] = getCourseList();
  const promises: any[] = [];
  for (const courseID of courseList) {
    const promise: any = getPage(courseID);
    promises.push(promise);
    promise.done((page: any) => {
      const course: Course = new Course(
        courseID.department,
        courseID.courseNumber,
        getCredits(page),
        Grade.C,
        getPrerequisites(page),
        getTitle(page),
        getDescription(page)
      );
      catalog.set(JSON.stringify(courseID), course);
      console.log(course);
    });
  }
  Promise.all(promises).then(() => {
    writeCatalogToFile();
  });
}

function writeCatalogToFile(): void {
  const jsonString: string = JSON.stringify([...catalog]);
  $('body').append(
    `<a href="${'data:text/plain;charset=utf-8,' +
      encodeURIComponent(jsonString)}" download="catalog.json">Download json</a>`
  );
}

function getCourseList(): CourseID[] {
  const courseList: CourseID[] = [];
  for (const category of CS_PROGRAM.categories) {
    for (const requirement of category.requirements) {
      for (const requirementOption of requirement.options) {
        addCourses(requirementOption, courseList);
      }
    }
  }
  return courseList;
}

function addCourses(requirementOption: RequirementOption, courseList: CourseID[]): void {
  if (requirementOption instanceof CourseID) {
    if (!courseList.includes(requirementOption)) {
      courseList.push(requirementOption);
    }
  } else if (requirementOption instanceof OptionList) {
    for (const option of requirementOption.options) {
      addCourses(option, courseList);
    }
  }
}

function getPage(courseID: CourseID): any {
  return $.getJSON(
    `http://anyorigin.com/go?url=https%3A//catalog.gmu.edu/search/%3FP%3D${
      courseID.department
    }%2520${courseID.courseNumber}&callback=?`
  );
}

function getTitle(data: any): string | undefined {
  const title = search('#fssearchresults > div > h2 > em', data.contents);
  if (title.length === 0) {
    return undefined;
  }
  const parsedTitle = title['0'].children['0'].data;
  return parsedTitle.replace('.', '');
}

function getDescription(data: any): string | undefined {
  const description = search('#fssearchresults > div > div > div.courseblockdesc', data.contents);
  if (description.length === 0) {
    return undefined;
  }

  const parsedDescription: string[] = [];
  for (const part of description['0'].children) {
    if (part.type === 'text') {
      parsedDescription.push(part.data);
    } else if (part.type === 'tag') {
      parsedDescription.push(part.children['0'].data.replace('Â', ''));
    }
  }

  return parsedDescription.join('');
}

function getCredits(data: any): number {
  const creditsSection = search('#fssearchresults > div > h2', data.contents);
  if (creditsSection.length === 0) {
    return 3;
  }
  const creditsString: string = creditsSection['0'].children[3].data;
  const credits = Number(creditsString.trim().charAt(0));
  return credits;
}

function getPrerequisites(data: any): Prereq.Prerequisite {
  const TOKENIZER_REGEX: RegExp = /(?:([A-Z]+\s\d+))|(.)/g;
  const AND_REGEX: RegExp = /and/g;
  const OR_REGEX: RegExp = /or/g;

  let startString: string | null = getPrerequisitesString(data);
  if (startString === null) {
    return Prereq.NONE;
  }
  startString = startString.split('.')[0].trim();
  startString = startString.replace(AND_REGEX, '+').replace(OR_REGEX, '-');

  const tokens: string[] = [];
  const matches = startString.match(TOKENIZER_REGEX);
  if (matches !== null) {
    for (let match of matches) {
      match = match.trim();
      if (match.length > 0 && match !== ',') {
        tokens.push(match);
      }
    }

    return evaluatePrerequisites(tokens);
  }
  return Prereq.NONE;
}

function getPrerequisitesString(data: any): string | null {
  const prereqSection = search('#fssearchresults > div > div > div > p.prereq', data.contents);
  const prereqString: string[] = [];

  if (prereqSection.length === 0) {
    return null;
  }

  for (const part of prereqSection['0'].children) {
    if (part.type === 'text') {
      prereqString.push(part.data);
    } else if (part.type === 'tag' && part.name === 'a') {
      prereqString.push(part.attribs.title.replace('Â', ''));
    }
  }
  return prereqString.join('');
}

function evaluatePrerequisites(tokens: string[]): Prereq.Prerequisite {
  const tokenList: Token[] = [];

  if (tokens.includes('(')) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '(') {
        const matchingParenIndex: number = getMatchingParen(tokens, i);
        if (matchingParenIndex < 0) {
          throw new Error("Couldn't find matching parentheses.");
        }
        tokenList.push(evaluatePrerequisites(tokens.slice(i + 1, matchingParenIndex)));
        i = matchingParenIndex;
      } else if (tokens[i] === '+') {
        tokenList.push(new AndOperator());
      } else if (tokens[i] === '-') {
        tokenList.push(new OrOperator());
      } else {
        tokenList.push(new Prereq.Course(CourseID.fromCourseName(tokens[i]), Grade.C));
      }
    }

    const prereqList: Prereq.Prerequisite[] = [];
    let hasAnd: boolean = false;

    for (const token of tokenList) {
      if (isPrerequisite(token)) {
        prereqList.push(token);
      } else if (isAndOperator(token)) {
        hasAnd = true;
      }
    }
    if (hasAnd) {
      return new Prereq.And(...prereqList);
    } else {
      // Or
      return new Prereq.Or(...prereqList);
    }
  } else {
    const courseList: Prereq.Course[] = [];
    for (const token of tokens) {
      if (token !== '+' && token !== '-') {
        courseList.push(new Prereq.Course(CourseID.fromCourseName(token), Grade.C));
      }
    }
    if (tokens.includes('+')) {
      return new Prereq.And(...courseList);
    } else {
      return new Prereq.Or(...courseList);
    }
  }
}

function getMatchingParen(tokens: string[], startIndex: number): number {
  let paren: number = 1;
  for (let i = startIndex + 1; i < tokens.length; i++) {
    const token: string = tokens[i];
    if (token === '(') {
      paren++;
    } else if (token === ')') {
      paren--;
    }
    if (paren === 0) {
      return i;
    }
  }
  return -1;
}

function isPrerequisite(token: Token): token is Prereq.Prerequisite {
  return (token as Prereq.Prerequisite).validatePrereq !== undefined;
}

function isAndOperator(token: Token): token is AndOperator {
  return (token as AndOperator).proveAndOperator !== undefined;
}

run();
