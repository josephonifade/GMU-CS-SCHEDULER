import { initializeGenerateSchedule } from './generateSchedule'
import { registerTabLinkClickListener } from './nav'

function selectCurrentTab() {
  // Get the element with id="defaultOpen" and click on it
  const urlHash = window.location.hash.substring(1)
  let currentTab = document.querySelector(`[data-tab-name=${urlHash}]`) as HTMLElement | null
  if (currentTab === null) {
    currentTab = document.getElementById("defaultOpen")
  }
  if (currentTab !== null) {
    currentTab.click()
  }
}

export function initializeUI() {
  registerTabLinkClickListener()
  selectCurrentTab()
  initializeGenerateSchedule()
}