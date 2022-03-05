import { identity, pickBy } from 'lodash'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSearchParams = (search) => {
    const [searchParams, setSearchParams] = useState(
        queryString.parse(search)
    )

    useEffect(() => {
        setSearchParams(queryString.parse(search))
    }, [search])

    return searchParams
}

export const useUpdateSearch = (pathname, search) => {
    const navigate = useNavigate()

    const handleSearchClick = (value) => {
        navigate(`${pathname}?${queryString.stringify(pickBy(value, identity))}`)
    }

    const handleChangePageSize = (index, size) => {
        const searchParams = queryString.parse(search)
        searchParams.limit = size?.toString() ?? ''
        searchParams.page = (Number(index) + 1)?.toString()
        navigate(`${pathname}?${queryString.stringify(searchParams)}`)
    }

    return { handleSearchClick, handleChangePageSize }
}
