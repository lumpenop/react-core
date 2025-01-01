function Button({ onClick, text }) {
  return (
    <button class="bg-purple-500 text-white p-2 rounded-md" type="button" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
