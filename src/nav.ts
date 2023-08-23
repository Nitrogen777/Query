import { goto } from '$app/navigation';


export const goHistory = () => {
    goto("/history")
}

export const goAnswer = () => {
    goto("/answer")
}

export const goAsk = () => {
    goto("/")
}