class React {
  states = new Map()
  stateIndex = 0
  listeners = []
  eventListeners = []
  currentRender = null
  currentComponent = null
  prevVDOM = null

  reactEvent = {
    input: 'input',
    change: 'input',
    click: 'click',
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

  diff = (currentTree, prevTree, currentTarget = [], prevTarget = []) => {
    if (currentTree === prevTree) return { isChanged: false }
    const { type: currentType, props: currentProps, childrenNode: currentChildrenNode } = currentTree
    const { type: prevType, props: prevProps, childrenNode: prevChildrenNode } = prevTree

    if (currentType !== prevType) {
      return {
        isChanged: true,
        currentTarget: [{ changeType: 'replace', element: currentTree.element }],
        prevTarget: [{ changeType: 'replace', element: prevTree.element }],
      }
    }

    const { children: currentChildren, ...currentRestProps } = currentProps
    const { children: prevChildren, ...prevRestProps } = prevProps

    if (currentChildren.length !== prevChildren.length) {
      return {
        isChanged: true,
        currentTarget: [{ changeType: 'replace', element: currentTree.element }],
        prevTarget: [{ changeType: 'replace', element: prevTree.element }],
      }
    }

    if (currentChildren) {
      const isChanged = currentChildren.some((child, index) => {
        if (typeof child === 'object') return false
        if (child !== prevChildren[index]) {
          return true
        }
      })
      if (isChanged) {
        currentTarget.push({ changeType: 'innerHTML', element: currentTree.element })
        prevTarget.push({ changeType: 'innerHTML', element: prevTree.element })
      }
    }

    const currentPropsKeys = Object.keys(currentRestProps)

    const diffProps = currentPropsKeys.filter(key => currentRestProps[key] !== prevRestProps[key])

    diffProps
      .filter(key => !key.startsWith('on'))
      .forEach(key => {
        currentTarget.push({
          changeType: 'propsChange',
          element: currentTree.element,
          prop: { key, value: currentRestProps[key] },
        })
        prevTarget.push({
          changeType: 'propsChange',
          element: prevTree.element,
          prop: { key, value: prevRestProps[key] },
        })
      })

    if (currentChildrenNode) {
      currentChildrenNode.forEach((child, index) => {
        this.diff(child, prevChildrenNode[index], currentTarget, prevTarget)
      })
    }

    if (currentTarget.length > 0) {
      return { isChanged: true, currentTarget, prevTarget }
    }
    return { isChanged: false }
  }

  render = tree => {
    const rootElement = document.createElement(tree.type)

    const virtualDOM = {
      type: tree.type,
      props: tree.props,
      element: rootElement,
      childrenNode: [],
    }

    const { children, checked, ...elementProps } = tree.props

    const eventProps = Object.keys(elementProps).filter(prop => prop.startsWith('on'))
    const otherProps = Object.keys(elementProps).filter(prop => !prop.startsWith('on'))

    eventProps.forEach(prop => {
      const key = prop.slice(2).toLowerCase()
      this.eventListeners.push({ target: rootElement, event: this.reactEvent[key], listener: elementProps[prop] })
    })

    // if (onClick) {
    //   // rootElement.addEventListener('click', onClick)
    //   this.eventHandlers.push({ element: rootElement, onClick })
    // }
    // if (onChange) rootElement.addEventListener('change', e => onChange(e))
    if (checked) rootElement.checked = checked

    otherProps.forEach(key => {
      rootElement.setAttribute(key, elementProps[key])
    })

    if (children) {
      children.map(child => {
        if (typeof child !== 'object') {
          rootElement.appendChild(document.createTextNode(child))
        } else {
          const { rootElement: element, virtualDOM: VDOM } = this.render(child)
          rootElement.appendChild(element)
          virtualDOM.childrenNode.push(VDOM)
        }
      })
    }

    return { rootElement, virtualDOM }
  }

  rerenderComponent = component => {
    this.stateIndex = 0
    return this.diff(component(), this.prevVDOM)
  }

  renderComponent = component => {
    if (!this.currentComponent) this.currentComponent = component
    this.stateIndex = 0
    const { rootElement, virtualDOM } = this.render(this.currentComponent())
    if (!this.prevVDOM) this.prevVDOM = virtualDOM

    const { isChanged, currentTarget, prevTarget } = this.diff(virtualDOM, this.prevVDOM)
    if (isChanged) {
      prevTarget.forEach((elementObj, index) => {
        if (elementObj.changeType === 'propsChange') {
          elementObj.element.setAttribute(elementObj.prop.key, currentTarget[index].prop.value)
        } else {
          elementObj.element.innerHTML = currentTarget[index].element.innerHTML
        }
      })
    }
    return rootElement
  }
}

const react = new React()

export default react
