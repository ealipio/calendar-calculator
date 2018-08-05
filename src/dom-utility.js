export const getValue = (Id) => {
  return document.querySelector(Id).value
}

export const mountInDOM = (children, parent) => {
  children.forEach(child => parent.appendChild(child))
}

export const createDOMElements = (names) => {
  return names.map(name => document.createElement(name))
}

export const resetElement = (element) => {
  while (element.firstChild) element.removeChild(element.firstChild)
}
