export async function getProducts() {
  try {
    const response = await fetch('http://localhost:8080/api/products');
    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
}
