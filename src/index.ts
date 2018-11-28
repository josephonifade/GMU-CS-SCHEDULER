
import { initializeUI } from './ui/main'
import { User, Year } from './data/User';
import {CATALOG} from './data/Catalog';
import {Course} from './data/Course';
import {CourseID} from './data/CourseID';
import {CS_PROGRAM, Requirement, RequirementOption, OptionList} from './data/CSProgram';
import {Prereq} from './data/Prereq';

let user = new User(8, Year.Freshman, []);
/*
interface Semester {
  year: number
  courses: object[]
}

interface Store {
  semesters: Semester[]
}

const DataStore = {

} as Store

// Add this to current catalog
addEventListener('semester-added', (event) => {
  const semester = event.detail
  console.log(semester)
  // Update current catalog
})

// Fire this in generate schedules once finished creating a semester
dispatchEvent(new CustomEvent('semester-added', {
  detail: { year: 1201 }
}))
*/
initializeUI()

$(document).ready(() => {
  console.log(CATALOG);

  var cart: Course[] = [];

  function createList(requirement: Requirement, id: string): string {
    const html: string[] = [];
    const list = requirement.options;
    const size = list.length < 10 ? list.length : 10;
    html.push(
      `<div id=${id}>`,
      `<select class="unselected" size="${size}">`,
      createOptions(list),
      '</select>',
      '<a class="select" href="">&gt;&gt;</a>',
      '<a class="deselect disabled" href="">&lt;&lt;</a>',
      `<select class="selected" size="${size}" max="${requirement.count}" required></select>`,
      '</div>',
      '</br>'
    );
    return html.join('');
  }

  function createOptions(options: RequirementOption[]): string {
    const ret: string[] = [];
    for (const option of options) {
      let displayString = option.toString();
      if (displayString.startsWith('(')) {
        displayString = displayString.substr(1, displayString.length - 2);
      }

      ret.push(`<option data-json='${JSON.stringify(option)}' title="${getTitle(option)}">
      ${displayString}</option>\n`);
    }
    return ret.join('');
  }

  function createAllLists(): void {
    for (const category of CS_PROGRAM.categories) {
      const categoryTitleNoSpaces = category.title.replace(/\s/g, '_');
      const html = [`<div id="${categoryTitleNoSpaces}">`, `<h2>${category.title}</h2>`];
      for (const requirementIndex in category.requirements) {
        if (!category.requirements.hasOwnProperty(requirementIndex)) {
          return;
        }
        const requirement = category.requirements[requirementIndex];
        if (requirement.count === 0) {
          html.push(
            `<h3>All of the following:</h3>`,
            '<ul>',
            requirement.options
              .map((requirementOption: RequirementOption) => {
                // if(isCourseID(requirementOption)){
                //   let course = CATALOG.get(JSON.stringify(requirementOption as CourseID));
                //   if(course){
                //     cart.push(course);
                //   }
                // }
                return `<li data-json='${JSON.stringify(requirementOption)}' 
                title="${getTitle(requirementOption)}">${requirementOption.toString()}</li>`;
              })
              .join(''),
            '</ul>'
          );
        } else {
          html.push(
            `<h3>Select ${requirement.count} of the following:</h3>`,
            createList(requirement, categoryTitleNoSpaces + '_req' + requirementIndex)
          );
        }
      }
      html.push('</div>');
      $('#CurrentCatalog-content').append(html.join(''));
    }
  }

  console.log('hi');
  createAllLists();

  // Select / Deselect List
  $('a.select').click((event) => {
    if (event.target.parentElement == null) {
      return;
    }
    const id: string = event.target.parentElement.id;

    event.preventDefault();
    const text: string = $(`div#${id} > select.unselected option:selected`).text();
    if (text) {
      let optionElement: JQuery<HTMLElement> = $(`div#${id} > select.unselected option:selected`);
      let option = optionElement.data('json');
      if (!option) {
        return;
      }
      let updatedCart: Course[] = getUpdatedCart(option, true);
      let error = !checkAllPrerequisites(updatedCart);

      if (error) {
        // return;
        cart = updatedCart
      } else {
        cart = updatedCart;
      }

      optionElement.remove();
      $(`div#${id} > select.selected`).append(optionElement);
      sortList(`div#${id} > select.selected`);

      const length = $(`div#${id} > select.selected`)
        .children()
        .get().length;
      const max: number = Number($(`div#${id} > select.selected`).attr('max'));
      if (length >= max) {
        $(`div#${id} > a.select`).addClass('disabled');
      }
      $(`div#${id} > a.deselect`).removeClass('disabled');
    }
    console.log(cart);
  });

  $('a.deselect').click((event) => {
    if (event.target.parentElement == null) {
      return;
    }
    const id: string = event.target.parentElement.id;

    event.preventDefault();
    const text: string = $(`div#${id} > select.selected option:selected`).text();
    if (text) {
      let optionElement: JQuery<HTMLElement> = $(`div#${id} > select.selected option:selected`);
      let optionString = optionElement.data('json');
      if (!optionString) {
        return;
      }
      let option: RequirementOption = optionString;
      let updatedCart: Course[] = getUpdatedCart(option, false);
      let error = !checkAllPrerequisites(updatedCart);

      if (error) {
        // return;
        cart = updatedCart;
      } else {
        cart = updatedCart;
      }

      optionElement.remove();
      $(`div#${id} > select.unselected`).append(optionElement);
      sortList(`div#${id} > select.unselected`);
      const length = $(`div#${id} > select.selected`)
        .children()
        .get().length;
      if (length === 0) {
        $(`div#${id} > a.deselect`).addClass('disabled');
      }
      $(`div#${id} > a.select`).removeClass('disabled');
    }
    console.log(cart);
  });

  function sortList(selector: string): void {
    const alphabeticalComparator = (a: HTMLElement, b: HTMLElement) => {
      const aText = a.innerHTML.toLowerCase();
      const bText = b.innerHTML.toLowerCase();

      if (aText < bText) {
        return -1;
      } else if (aText > bText) {
        return 1;
      }
      return 0;
    };

    const list: JQuery = $(selector);
    const sortedOptions = list
      .children()
      .get()
      .sort(alphabeticalComparator)
      .map((value: HTMLElement) => {
        return value.outerHTML;
      });
    list.empty();
    list.html(sortedOptions.join());
  }

  function getTitle(option: RequirementOption): string {
    let courseTitle: string = '';
    let courseDescription: string = '';
    if (option instanceof CourseID) {
      const course: Course | undefined = CATALOG.get(JSON.stringify(option));
      if (course) {
        if (course.title) {
          courseTitle = course.title;
        }
        if (course.description) {
          courseDescription = course.description;
        }
      }
    }
    const title = courseTitle + '\n\n' + courseDescription;
    return title.trim();
  }

  function checkAllPrerequisites(updatedCart: Course[]): boolean {
    for (let course of updatedCart) {
      let prereqs = checkPrerequisites(course, updatedCart);
      const error: boolean = !handlePrerequisites(course, prereqs);
      if (error) {
        // Short-circuiting here ensures that the user will never see multiple dialogs for a single action
        return false;
      }
    }
    return true;
  }

  function checkPrerequisites(course: Course, updatedCart: Course[]): Prereq.Prerequisite[] {
    console.log('course', course);
    // if (isCourseID(option)) {
    //   let course: Course | undefined = CATALOG.get(JSON.stringify(option));
    //   console.log('course', course);
    //   if (!course) {
    //     throw new Error('Course not in catalog.');
    //   }
    //   let y = course.getFailingPrerequisitesNoGrade(option);
    //   console.log('failingprereqs',y);
    //   return y;
    // } else if (isOptionList(option)) {
    //   console.log('id as optionlist');
    //   const allFailingPrereqs: Prereq.Prerequisite[] = [];
    //   for (const innerOption of option.options) {
    //     let failingPrereqs = checkPrerequisites(innerOption);
    //     for (let prereq of failingPrereqs) {
    //       if (!allFailingPrereqs.includes(prereq)) {
    //         allFailingPrereqs.push(prereq);
    //       }
    //     }
    //   }
    //   return allFailingPrereqs;
    // } else {
    //   console.log('not id as either');
    // }

    let courseIDCart: CourseID[] = updatedCart.map((course) => course.id);
    console.log('courseidcart', courseIDCart);

    let prereq: Prereq.Prerequisite = course.prerequisites;
    let prereqCopy: Prereq.Prerequisite = Prereq.getPrereqCopy(prereq);

    console.log(course.prerequisites);
    console.log('prereqs ==', prereqCopy instanceof Prereq.And, prereqCopy instanceof Prereq.Or, prereqCopy instanceof Prereq.Course)

    let courseCopy: Course = new Course(course.id.department, course.id.courseNumber, course.credits, course.minGrade, prereqCopy, course.title, course.description );

    console.log('cc instanceof course', courseCopy instanceof Course);

    let y = courseCopy.getFailingPrerequisitesNoGrade(...courseIDCart);
    console.log(y);
    return y;

    // let id = new CourseID(course.id.department, course.id.courseNumber);
    // let courseCopy: Course | undefined = CATALOG.get(JSON.stringify(id));
    // console.log('cc', courseCopy);
    // console.log('instanceof', courseCopy instanceof Course);
    // if(courseCopy){
    //   return courseCopy.getFailingPrerequisitesNoGrade(...updatedCart.map((course) => course.id));
    // }
    return [];
  }

  function handlePrerequisites(
    option: RequirementOption,
    failingPrereqs: Prereq.Prerequisite[]
  ): boolean {
    if (failingPrereqs.length > 0) {
      console.log(option, failingPrereqs);
      // alert(
      //   `You cannot have ${option.toString()} in your cart unless you have the following prerequisites:\n\n${failingPrereqs
      //     .map((prereq) => prereq.toString())
      //     .join('\n')}`
      // );

      alert('You do not have the proper prerequisite courses selected to make this change');
      return false;
    }
    return true;
  }

  function getUpdatedCart(option: RequirementOption, add: boolean): Course[] {
    let courseIDList: CourseID[] = [];
    getCoursesFromRequirementOption(option, courseIDList);

    let courseList: Course[] = [];
    for (let courseID of courseIDList) {
      let course = CATALOG.get(JSON.stringify(courseID));
      if (course) {
        courseList.push(course);
      }
    }
    if(add){
      return cart.concat(courseList);
    } else {
      return cart.filter((course) => !courseList.includes(course))
    }
  }

  function getCoursesFromRequirementOption(
    requirementOption: RequirementOption,
    courseList: CourseID[]
  ): void {
    if (isCourseID(requirementOption)) {
      if (!courseList.includes(requirementOption)) {
        courseList.push(requirementOption);
      }
    } else if (isOptionList(requirementOption)) {
      for (const option of requirementOption.options) {
        getCoursesFromRequirementOption(option, courseList);
      }
    }
  }
});

function isCourseID(x: any): x is CourseID {
  return x.department && typeof x.department  === 'string' && x.courseNumber && typeof x.courseNumber === 'number';
}

function isOptionList(x: any): x is OptionList {
  return x.count && typeof x.count === 'number' && x.options;
}



//CurrentCatalog-content
