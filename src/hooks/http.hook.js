import { useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setRrror] = useState(null)

    const request = () => {

    }

    return { loading, request, error}
}