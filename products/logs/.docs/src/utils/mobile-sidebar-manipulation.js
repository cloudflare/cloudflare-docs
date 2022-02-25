const attr = "is-mobile-sidebar-open"

export const sidebarIsOpen = () => {
  return document.documentElement.hasAttribute(attr)
}

export const sidebarOpen = () => {
  document.documentElement.setAttribute(attr, "")
}

export const sidebarClose = () => {
  document.documentElement.removeAttribute(attr)
}

export const sidebarToggle = () => {
  if (sidebarIsOpen()) return sidebarClose()
  sidebarOpen()
}
