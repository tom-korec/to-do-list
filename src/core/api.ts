const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
