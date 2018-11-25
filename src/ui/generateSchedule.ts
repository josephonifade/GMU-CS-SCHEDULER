const semesterForm = document.querySelector("#semesterForm") as HTMLFormElement

export function initializeGenerateSchedule() {
  semesterForm.addEventListener("submit", function (event) {
    event.preventDefault()

    const elements = semesterForm.elements as any
    const year = elements['year']
    const semester = elements['semester']
    console.log(year.value, semester.value)
  })
}
