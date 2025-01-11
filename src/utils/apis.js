export const dataFetch = () => {
  const postData = (headers, data) => {
    return fetch('http://localhost:3001', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data,
      }),
    })
      .then(response => response)
      .catch(error => console.error('Error:', error))
  }

  return { postData }
}
