export const vFocus = {
    mounted:(value) => {
        value.focus()
    }
}
export const vCapitalize = {
  mounted: (val) => {
    val.addEventListener('input', (v) => {
      let value = v.target.value;
      if (value) {
        v.target.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        v.target.dispatchEvent(new Event('input'));
      }
    })
  }
}