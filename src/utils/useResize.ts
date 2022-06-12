// https://stackoverflow.com/a/68609331/1253025

import { useEffect } from "react";
import { useMainContext } from "MainContext"

export interface UseWindowSizeProps {
  cooldown?: number
}

export const defaultCooldown = 300

const useResize = ({ cooldown = defaultCooldown }: UseWindowSizeProps) => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useMainContext()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null

    const handleResize = () => {
      dispatch({
        type: "SET_WINDOW_DIMENSIONS",
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    const debounceResize = () => {
      if(timeoutId) {
        // Just wait for it to finish
      } else {
        timeoutId = setTimeout(
          () => {
            handleResize()
            timeoutId = null
          },
          cooldown
        )
        handleResize()
      }
    }

    window.addEventListener("resize", debounceResize)

    return () => {
      if(timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      window.removeEventListener("resize", debounceResize)
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useResize


