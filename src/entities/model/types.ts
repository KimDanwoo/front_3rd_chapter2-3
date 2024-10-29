export interface Address {
  address: string
  city: string
  state: string
}

export interface Company {
  name: string
  title: string
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: User
}

export interface User {
  id: number
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}

export interface UserProfileProps {
  selectedUser: User | null
}

export interface PostWithAuthor extends Post {
  author?: User
}

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}
