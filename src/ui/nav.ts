const tabLinks = Array.from(document.querySelectorAll(".tablink")) as HTMLButtonElement[]
const tabContents = Array.from(document.querySelectorAll(".tabcontent")) as HTMLDivElement[]
const mainContents = Array.from(document.querySelectorAll(".main-content")) as HTMLDivElement[]

function hideElements(elements: HTMLDivElement[]) {
  elements.forEach((element) => {
    element.style.display = "none";
  })
}

function onTabClick(tab: HTMLDivElement | null, button: HTMLButtonElement, color: string, content: HTMLDivElement | null) {

  hideElements(tabContents)
  hideElements(mainContents)

  tabLinks.forEach(function (button) {
    button.style.backgroundColor = ""

  })

  if (tab !== null) {
    tab.style.display = "block"; //display block as tab
  }
  if (content !== null) {
    content.style.display = "block"; //display block as content
  }
  button.style.backgroundColor = color;
}

export function registerTabLinkClickListener () {
  tabLinks.forEach(function (button) {
    const tabName = button.dataset.tabName || ''
    const color = button.dataset.color || ''
  
    const tab = document.getElementById(tabName) as HTMLDivElement
    const content = document.getElementById(`${tabName}-content`) as HTMLDivElement
    button.addEventListener("click", function () {
      window.location.replace(`#${tabName}`)
      onTabClick(tab, button, color, content)
    })
  })
}