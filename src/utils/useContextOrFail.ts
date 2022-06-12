import { useContext, Context } from "react";

type MaybeContext<T> = Context<T | undefined>

const useContextOrFail = <T>(context: MaybeContext<T>) => {
  const maybeContext = useContext(context as MaybeContext<T>)

  if(!maybeContext) {
    throw new Error("Missing context")
  }

  return maybeContext
}

export default useContextOrFail
