import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useScrollToSource = () => {
  const router = useRouter()
  const {
    query: { source },
  } = router

  useEffect(() => {
    if (source && typeof source === 'string') {
      const anchors = document.querySelectorAll(`a`)

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]

        if (anchor.href.includes(source)) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
          anchor.classList.add('scrolled-source-link')
          break
        }
      }
    }
  }, [source])
}
