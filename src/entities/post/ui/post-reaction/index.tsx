import { Reactions } from '@entities/post/model'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { FC } from 'react'

interface PostReactionProps {
  reactions: Reactions
}

export const PostReaction: FC<PostReactionProps> = ({ reactions }) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  )
}
