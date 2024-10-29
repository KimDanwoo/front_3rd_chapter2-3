import { useFetchTags } from './useTagsQuery'

export const useTags = () => {
  const { data: tags } = useFetchTags()

  return {
    tags,
  }
}
