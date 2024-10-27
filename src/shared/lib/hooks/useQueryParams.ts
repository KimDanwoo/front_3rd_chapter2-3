import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface UseQueryParamsParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (searchQuery: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setSelectedTag: (selectedTag: string) => void
}

export const useQueryParams = (defaultParams: Partial<UseQueryParamsParams> = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useState(parseInt(queryParams.get('skip') || defaultParams.skip?.toString() || '0'))
  const [limit, setLimit] = useState(parseInt(queryParams.get('limit') || defaultParams.limit?.toString() || '10'))
  const [searchQuery, setSearchQuery] = useState(queryParams.get('searchQuery') || defaultParams.searchQuery || '')
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || defaultParams.sortBy || '')
  const [sortOrder, setSortOrder] = useState(queryParams.get('sortOrder') || defaultParams.sortOrder || 'asc')
  const [selectedTag, setSelectedTag] = useState(queryParams.get('selectedTag') || defaultParams.selectedTag || '')

  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set('skip', skip.toString())
    if (limit) params.set('limit', limit.toString())
    if (searchQuery) params.set('searchQuery', searchQuery)
    if (sortBy) params.set('sortBy', sortBy)
    if (sortOrder) params.set('sortOrder', sortOrder)
    if (selectedTag) params.set('selectedTag', selectedTag)
    navigate(`?${params.toString()}`)
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  return {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  }
}
