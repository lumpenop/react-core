const createElement = (type, props, children) => {
  return {
    type,
    props: {
      ...props,
      children,
    },
    // key,
    // ref,
  }
}
export default createElement
