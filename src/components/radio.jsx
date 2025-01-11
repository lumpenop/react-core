import SectionLayout from './section-layout'

function Radio({ value, setRadio }) {
  return (
    <SectionLayout>
      <h2>
        radio <span class="text-red-400">*</span>
      </h2>
      <form action="" class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <input
            id="radio1"
            type="radio"
            value="radio1"
            name="radio"
            checked={value === 'radio1'}
            onChange={() => setRadio('radio1')}
          />
          <label for="radio1">radio option1</label>
        </div>
        <div class="flex items-center gap-2">
          <input
            id="radio2"
            type="radio"
            value="radio2"
            name="radio"
            checked={value === 'radio2'}
            onChange={() => setRadio('radio2')}
          />
          <label for="radio2">radio option2</label>
        </div>
        <div class="flex items-center gap-2">
          <input
            id="radio3"
            type="radio"
            value="radio3"
            name="radio"
            checked={value === 'radio3'}
            onChange={() => setRadio('radio3')}
          />
          <label for="radio3">radio option3</label>
        </div>
      </form>
    </SectionLayout>
  )
}

export default Radio
