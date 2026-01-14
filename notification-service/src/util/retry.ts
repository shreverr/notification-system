async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1500
) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn()

      if (result instanceof Response && !result.ok) {
        throw new Error(
          `Failed to fetch: ${result.statusText}`
        )
      }

      return result
    } catch (error) {
      console.log(`Attempt ${i+1} failed`);

      if (i === retries - 1) throw error
      await new Promise((res) => setTimeout(res, delay))
    }
  }

  throw new Error("Retries exceeded")
}