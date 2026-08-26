"use server"

export async function SearchResult() {
    const response = await fetch('https://dummyjson.com/products?limit=10')
    .then((res) => res.json())
    .catch((error) => {
        console.error('Error fetching data:', error)
        throw error
    })
    return response.products
}