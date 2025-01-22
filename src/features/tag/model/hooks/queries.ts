import { DEFAULT_STALE_TIME } from '@shared/model'
import { Tag } from '@entities/tag/model'
import { tagApi } from '@features/tag/api'
import { useQuery } from '@tanstack/react-query'

export function useTagsQuery() {
  return useQuery<Tag[], Error>({
    queryKey: ['tags'],
    queryFn: tagApi.fetchTags,
    staleTime: DEFAULT_STALE_TIME,
  })
}
