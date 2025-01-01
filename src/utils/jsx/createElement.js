const createElement = (type, props, children) => {
  if (typeof type === 'function') {
    // props와 children을 합쳐서 컴포넌트에 전달
    const componentProps = {
      ...props,
      children,
    }
    // 컴포넌트 함수 실행
    return type(componentProps)
  }

  // 일반 HTML 엘리먼트의 경우
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}

export default createElement
