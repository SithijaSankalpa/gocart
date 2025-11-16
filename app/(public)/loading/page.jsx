'use client'

import Loading from "@/components/Loading"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function LoadingPage() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const url = params.get('nexturl')

        if (url) {
            // Show success toast
            toast.success('Payment Successful! Processing your order...', {
                duration: 5000,
                position: 'top-center',
            })

            // Countdown timer
            const countdownInterval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            // Redirect after 5 seconds
            const redirectTimer = setTimeout(() => {
                router.push(`/${url}`)
            }, 5000)

            return () => {
                clearInterval(countdownInterval)
                clearTimeout(redirectTimer)
            }
        }
    }, [router])

    return <Loading />
}
