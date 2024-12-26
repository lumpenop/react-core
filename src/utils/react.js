class React {
  states = new Map()
  stateIndex = 0
  listeners = []
  currentRender = null

  constructor() {
    this.currentComponent = null
  }

  setState = (index, newState) => {
    const states = this.states.get(this.currentComponent)
    if (typeof newState === 'function') {
      states[index] = newState(states[index])
    } else {
      states[index] = newState
    }
    this.listeners.forEach(listener => listener()) // subscribe 함수 호출
  }

  subscribe = listener => {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  useState = initialValue => {
    if (!this.states.has(this.currentComponent)) {
      this.states.set(this.currentComponent, [])
    }

    const states = this.states.get(this.currentComponent)

    if (states.length <= this.stateIndex) {
      states[this.stateIndex] = initialValue
    }

    const index = this.stateIndex
    const setState = this.setState.bind(this, index)

    if (!this.currentRender) {
      this.currentRender = states
    }

    this.stateIndex++
    return [this.currentRender[index], setState]
  }

  diff = tree => {
    console.log(tree, 'tree')
    return tree
  }

  render = tree => {
    const rootElement = document.createElement(tree.type)
    if (tree.type === 'h1') {
      console.log(tree, 'tree') // + 1
    }

    const { children, onClick, onChange, checked, ...elementProps } = tree.props

    if (onClick) rootElement.addEventListener('click', onClick)
    if (onChange) rootElement.addEventListener('change', e => onChange(e))
    if (checked) rootElement.checked = checked

    Object.keys(elementProps).forEach(key => {
      rootElement.setAttribute(key, elementProps[key])
    })
    if (children) {
      if (Array.isArray(children)) {
        children.map(child => {
          if (typeof child !== 'object') {
            rootElement.appendChild(document.createTextNode(child))
          } else {
            rootElement.appendChild(this.render(child))
          }
        })
      } else {
        if (typeof children !== 'object') {
          rootElement.appendChild(document.createTextNode(children))
        } else {
          rootElement.appendChild(this.render(children))
        }
      }
    }
    return rootElement
  }

  renderComponent = component => {
    if (!this.currentComponent) this.currentComponent = component
    this.stateIndex = 0
    console.log(this.currentComponent === component, 'this.currentComponent')

    return this.render(component()) // state 가 initialValue 일 때
  }
}

const react = new React()

export default react
