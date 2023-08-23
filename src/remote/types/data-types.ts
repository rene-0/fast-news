import { Timestamp } from 'firebase/firestore'

export type NewsType = {
  id: string
  content: string
  description: string
  image_url: string
  language: string
  original_link: string
  publish_date: Timestamp
  title: string
  total_comments: number
  total_stars: number
  total_views: number
}

export type CommentType = {
  id: string
  comment: string
  comment_date: string
  user_email: string
  user_name: string
  user_image: string
  news_id: string
}

export type StarType = {
  id: string
  news_id: string
  user_email: string
}

export type ViewsType = {
  id: string
  news_id: string
  user_email: string
}

export type BookmarksType = {
  id: string
  news_id: string
  user_email: string
  bookmarked_at: Timestamp
}
