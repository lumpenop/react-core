import SectionLayout from './section-layout'

function Checkbox({ checked, setChecked }) {
  const checkBoxes = Array.from(checked.keys())

  return (
    <SectionLayout>
      <h2>
        checkbox <span class="text-red-400">*</span>
      </h2>
      <ul>
        {checkBoxes.map((checkBox, index) => (
          <li key={index} class="flex items-center gap-2">
            <input
              id={checkBox}
              type="checkbox"
              name="checkbox"
              checked={checked.get(checkBox)}
              onChange={() => setChecked(prev => checked.set(checkBox, !prev.get(checkBox)))}
            />
            <label for={checkBox}>{checkBox}</label>
          </li>
        ))}
      </ul>
    </SectionLayout>
  )
}

export default Checkbox
