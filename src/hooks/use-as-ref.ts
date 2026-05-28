"use client"

import { useRef } from "react"
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect"

export function useAsRef<T>(value: T) {
  const ref = useRef(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
