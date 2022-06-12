import { useReducer, Dispatch, createContext } from "react"
import { Config, getConfig } from "Config"
import useContextOrFail from "utils/useContextOrFail"

export interface State {
  window: {
    width: number,
    height: number
  },
  config: Config,
}

const defaultState: State = {
  window: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  config: getConfig(),
}


export type Action =
  | {
      type: "SET_WINDOW_DIMENSIONS",
      height: number,
      width: number,
    }

const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case "SET_WINDOW_DIMENSIONS": {
      return {
        ...state,
        window: {
          height: action.height,
          width: action.width,
        }
      }
    }
  }
}

type ContextValue = [State, Dispatch<Action>]
export const MainContext = createContext<ContextValue | undefined>(undefined)

type ProviderProps = { children: React.ReactNode }

export const MainContextProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <MainContext.Provider value={[state, dispatch]}>
      {props.children}
    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  return useContextOrFail(MainContext)
}
