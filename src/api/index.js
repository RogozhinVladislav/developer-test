const sendApiRequest = (urn, reqParams) => {
  const url = 'https://api.chucknorris.io/jokes/'

  const headers = new Headers()
  headers.append('Accept', 'application/json')

  return fetch(url + urn, {
    method: 'GET',
    headers: headers
  })
}

export const fetchRandomJoke = (category) => sendApiRequest(`random${category ? `?category=${category}` : ''}`)
export const fetchJokesByQuery = (query) => sendApiRequest(`search?query=${query}`)
export const fetchCategories = () => sendApiRequest(`categories`)
export const fetchRandomJokeByCategory = (category) => sendApiRequest(`random?category=${category}`)
