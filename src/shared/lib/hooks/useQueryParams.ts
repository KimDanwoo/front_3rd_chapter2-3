import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface UseQueryParamsParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
}

export const useQueryParams = (defaultParams: Partial<UseQueryParamsParams> = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [params, setParams] = useState({
    skip: parseInt(queryParams.get('skip') || defaultParams.skip?.toString() || '0'),
    limit: parseInt(queryParams.get('limit') || defaultParams.limit?.toString() || '10'),
    searchQuery: queryParams.get('searchQuery') || defaultParams.searchQuery || '',
    sortBy: queryParams.get('sortBy') || defaultParams.sortBy || '',
    sortOrder: queryParams.get('sortOrder') || defaultParams.sortOrder || 'asc',
    selectedTag: queryParams.get('selectedTag') || defaultParams.selectedTag || '',
  })

  const handleChangeParams = (params: { key: string; value: string }) => {
    setParams((prevParams) => ({ ...prevParams, ...params }))
  }

  useEffect(() => {
    const newParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value.toString())
    })
    navigate(`?${newParams.toString()}`)
  }, [params, navigate])

  return { params, handleChangeParams }
}
