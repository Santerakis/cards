export const createFormData = (data: object): FormData => {
  const form = new FormData()
  const keysArray = Object.keys(data) as (keyof object)[]

  keysArray.forEach(key => {
    if (data[key]) {
      form.append(key, data[key])
    }
  })

  return form
}
