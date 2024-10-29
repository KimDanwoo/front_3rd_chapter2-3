import { useQuery } from '@tanstack/react-query'
import { tagsApi } from '../api'

export const postsKeys = {
  tags: () => ['tags'] as const,
}

export const useFetchTags = () => {
  return useQuery({
    queryKey: postsKeys.tags(),
    queryFn: tagsApi.getTags,
  })
}
