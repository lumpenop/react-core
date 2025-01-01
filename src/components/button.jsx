function Button({ onClick, text, disabled }) {
  const bgColor = disabled ? 'bg-gray-500' : 'bg-purple-500'
  return (
    <button class={`${bgColor} text-white p-2 rounded-md`} type="button" onClick={onClick} disabled={false}>
      {text}
    </button>
  )
}

export default Button
