

// @ts-ignore
export const questionsApi = axios.create({
  baseURL: 'https://opentdb.com/api.php/?amount=20',
  timeout: 5000
})