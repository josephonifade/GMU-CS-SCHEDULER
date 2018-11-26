import { CS_PROGRAM, Category } from '../data/CSProgram'

const semesterForm = document.querySelector("#semesterForm") as HTMLFormElement

function combineCategoryCourses (category: Category, index: number) {
  return category.requirements.reduce((accumulator, requirement) => {
    return accumulator + requirement.options.reduce((innerAccumulator, option, innerIndex) => {
      return innerAccumulator + `
      <input type="checkbox" id="category-${index}-${innerIndex}" name="categories" value="${option.toString()}">
      <label for="category-${index}-${innerIndex}">${option.toString()}</label>
      `
    }, '')
  }, '')
}

CS_PROGRAM.categories.forEach((category, index) => {
  const categories = `
    <p>
      <h3>${category.title}</h3>
      ${combineCategoryCourses(category, index)}
      
    </p>  
  `
  semesterForm.innerHTML = `${semesterForm.innerHTML}${categories}`

  // const input  = document.createElement('input')
  // const label  = document.createElement('label')
  // input.type = 'checkbox'
  // input.id = `category-${index}`
  // input.name = 'categories'
  // input.value = category.title
  // label.innerText = category.title
  // label.htmlFor = input.id
  // semesterForm.appendChild(input)
  // semesterForm.appendChild(label)
})

export function initializeGenerateSchedule() {
  semesterForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const elements = semesterForm.elements as any
    const year = elements['year']
    const semester = elements['semester']
    const categories = Array.from(elements['categories']) as HTMLInputElement[]
    console.log(year.value, semester.value, categories.filter(category => category.checked))
  })
}
