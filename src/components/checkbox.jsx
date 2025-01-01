import SectionLayout from './section-layout'

function Checkbox({ checked, setChecked }) {
  const checkBoxes = Array.from(checked.keys())

  return (
    <SectionLayout>
      {checkBoxes.map((checkBox, index) => (
        <div class="flex items-center gap-2">
          <input
            id={checkBox}
            type="checkbox"
            name="checkbox"
            checked={checked.get(checkBox)}
            onChange={() => setChecked(prev => checked.set(checkBox, !prev.get(checkBox)))}
          />
          <label for={checkBox}>{checkBox}</label>
        </div>
      ))}
    </SectionLayout>
  )
}

export default Checkbox
