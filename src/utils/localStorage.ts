

export const getFromLS = <T>(storage: string): T | null => {
    const item = localStorage.getItem(storage)
    return item ? JSON.parse(item) : null
}



interface DataProps {
    refresh: string,
    token: string
}

export const addToLS = (storage: string, data: DataProps[]) => {
    return localStorage.setItem(storage, JSON.stringify(data))
}



export const clearLS = () => {
    return localStorage.clear()
}