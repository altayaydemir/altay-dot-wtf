import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useScrollToTag = () => {
  const router = useRouter()
  const {
    query: { tag },
  } = router

  useEffect(() => {
    if (tag) {
      const links = document.querySelectorAll(`a[href='/tags/${tag}']`)

      if (links.length) {
        links[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
        links[0].classList.add('scrolled-tag-link')
      }
    }
  }, [tag])
}
