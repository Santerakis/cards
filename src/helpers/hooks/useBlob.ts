import { useEffect, useState } from 'react'

export function useCreateBlob(fileUrl: string) {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBlob = async () => {
      try {
        const response = await fetch(fileUrl)

        if (!response.ok) {
          new Error('Failed to fetch the file')
        }
        const arrayBuffer = await response.arrayBuffer()

        setBlob(new Blob([arrayBuffer], { type: response.headers.get('content-type') ?? '' }))
      } catch (err: any) {
        setError(err)
      }
    }

    fetchBlob()
  }, [fileUrl])

  return { blob, error }
}
