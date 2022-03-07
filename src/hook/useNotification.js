import { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'


export const useNotification = (
    error,
    isSuccess,
    message
) => {
    const { addToast } = useToasts()
    useEffect(() => {
        if (error) {
            console.log('error...', error)
            const message = error?.message?.split(':')[0]
            addToast(message, { appearance: 'error' })
        }
        if (isSuccess) {
            addToast(message, { appearance: 'success' })
        }
    }, [error, isSuccess])
}
