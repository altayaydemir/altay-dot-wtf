import { useEffect } from 'react'

const CV: React.FC = () => {
  useEffect(() => {
    window.location.href = '/documents/cv.pdf'
  }, [])

  return null
}

export default CV
