
import { initializeUI } from './ui/main'
import { User, Year } from './data/User';

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
