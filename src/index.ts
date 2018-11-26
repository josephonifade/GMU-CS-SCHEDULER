
import { initializeUI } from './ui/main'

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

initializeUI()