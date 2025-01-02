class React {
  states = new Map()
  stateIndex = 0
  effectIndex = 0
  listeners = []
  effectListeners = []
  eventListeners = []
  currentComponent = null
  prevVDOM = null

  reactEvent = {
    input: 'input',
    change: 'change',
    click: 'click',
  }

  setState = (index, newState) => {
    Promise.resolve().then(() => {
      const states = this.states.get(this.currentComponent)
      if (typeof newState === 'function') {
        states[index] = newState(states[index])
      } else {
        states[index] = newState
      }

      this.listeners.forEach(listener => listener())
    })
  }

  subscribe = listener => {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  useEffect = (effect, deps) => {
    if (!deps) {
      effect()
      return
    }

    if (!this.effectListeners[this.effectIndex]) {
      this.effectListeners.push({ effect, deps })
      effect()
    } else {
      const { effect: prevEffect, deps: prevDeps } = this.effectListeners[this.effectIndex]

      if (prevDeps.some((dep, index) => dep !== deps[index])) {
        this.effectListeners[this.effectIndex] = { effect, deps }
        prevEffect()
      }
    }
    this.effectIndex++
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

    this.stateIndex++
    return [states[index], setState]
  }

  diff = (currentTree, prevTree, currentTarget = [], prevTarget = []) => {
    if (currentTree === prevTree) return { isChanged: false }
    const { type: currentType, props: currentProps, element: currentElement } = currentTree
    const { type: prevType, props: prevProps, element: prevElement } = prevTree

    const { children: currentChildren, ...currentRestProps } = currentProps
    const { children: prevChildren, ...prevRestProps } = prevProps
    if (currentType !== prevType) {
      return {
        isChanged: true,
        currentTarget: [{ changeType: 'replace', element: this.render(currentTree) }],
        prevTarget: [{ changeType: 'replace', element: prevElement }],
      }
    }

    if (currentChildren.length !== prevChildren.length) {
      return {
        isChanged: true,
        currentTarget: [{ changeType: 'replace', element: this.render(currentTree) }],
        prevTarget: [{ changeType: 'replace', element: prevElement }],
      }
    }

    if (currentChildren) {
      const notObjectChildren = currentChildren.filter(child => typeof child !== 'object')
      notObjectChildren.forEach((child, index) => {
        if (child !== prevChildren[index]) {
          const { rootElement, virtualDOM } = this.render(currentTree)
          currentTarget.push({ changeType: 'innerHTML', element: rootElement })
          prevTarget.push({ changeType: 'innerHTML', element: prevElement })
        }
      })
      const objectChildren = currentChildren.filter(child => typeof child === 'object')
      objectChildren.forEach((child, index) => {
        if (typeof child === 'object') {
          this.diff(child, prevChildren[index], currentTarget, prevTarget)
        }
        // if (child !== prevChildren[index]) {
        //   console.log('hi', child, prevChildren[index])
        //   currentTarget.push({ changeType: 'innerHTML', element: this.render(currentTree) })
        //   prevTarget.push({ changeType: 'innerHTML', element: prevElement })
        // }
      })
    }

    const currentPropsKeys = Object.keys(currentRestProps)

    const diffProps = currentPropsKeys.filter(key => currentRestProps[key] !== prevRestProps[key])

    diffProps
      .filter(key => !key.startsWith('on'))
      .forEach(key => {
        currentTarget.push({
          changeType: 'propsChange',
          element: this.render(currentTree),
          prop: { key, value: currentRestProps[key] },
        })
        prevTarget.push({
          changeType: 'propsChange',
          element: prevElement,
          prop: { key, value: prevRestProps[key] },
        })
      })

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
    }

    const { children, checked, value, disabled, ...elementProps } = tree.props

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

    if (value !== undefined) {
      rootElement.value = value
    }

    if (disabled) rootElement.disabled = Boolean(disabled)
    otherProps.forEach(key => {
      rootElement.setAttribute(key, elementProps[key])
    })

    if (children) {
      children.map(child => {
        if (typeof child !== 'object') {
          rootElement.appendChild(document.createTextNode(child))
        } else {
          const { rootElement: element } = this.render(child)
          child.element = element
          rootElement.appendChild(element)
        }
      })
    }

    return { rootElement, virtualDOM }
  }

  rerenderComponent = componentTree => {
    this.stateIndex = 0
    this.currentComponentTree = componentTree

    const { isChanged, currentTarget, prevTarget } = this.diff(componentTree, this.prevVDOM)
    if (isChanged) {
      prevTarget.forEach((elementObj, index) => {
        if (elementObj.changeType === 'propsChange') {
          elementObj.element.setAttribute(elementObj.prop.key, currentTarget[index].prop.value)
        } else {
          elementObj.element.innerHTML = currentTarget[index].element.innerHTML
        }
      })
    }
  }

  renderComponent = componentTree => {
    if (!this.currentComponentTree) this.currentComponentTree = componentTree
    this.stateIndex = 0
    this.effectIndex = 0
    const { rootElement, virtualDOM } = this.render(componentTree)

    if (!this.prevVDOM) this.prevVDOM = virtualDOM

    // const { isChanged, currentTarget, prevTarget } = this.diff(virtualDOM, this.prevVDOM)
    // if (isChanged) {
    //   prevTarget.forEach((elementObj, index) => {
    //     if (elementObj.changeType === 'propsChange') {
    //       elementObj.element.setAttribute(elementObj.prop.key, currentTarget[index].prop.value)
    //     } else {
    //       elementObj.element.innerHTML = currentTarget[index].element.innerHTML
    //     }
    //   })
    // }
    return rootElement
  }
}

const react = new React()

export default react
