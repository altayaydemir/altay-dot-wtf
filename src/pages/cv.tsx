import { useEffect } from 'react'

const CV: React.FC = () => {
  useEffect(() => {
    window.location.href = '/cv.pdf'
  }, [])

  return null
}

export default CV
