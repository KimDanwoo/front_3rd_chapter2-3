import { createHashRouter, RouterProvider } from 'react-router-dom'

import { PostPage } from '@pages/post'

const router = createHashRouter([
  {
    path: '/',
    element: <PostPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
