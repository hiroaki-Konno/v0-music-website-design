// データモデルの型定義

export interface YourModel {
  id: number
  title: string
  artist: string
  album: string
  release_date: string
  genre: string
  is_active: boolean
}

export interface User {
  user_id: number
  username: string
  email: string
  profile_information?: string
  is_active: boolean
}

export interface GoogleAuth {
  auth_id: number
  user: number // User ID
  google_id_token: string
  access_token: string
  refresh_token: string
  token_expiry: string
}

export interface ScoreMetadata {
  metadata_id: number
  genre?: string
  duration?: number
  upload_date: string
  description?: string
  tags?: string[]
  is_active: boolean
}

export interface Score {
  score_id: number
  metadata: number // ScoreMetadata ID
  title: string
  composer?: string
  instrument?: string
  generated_score_url?: string
  version_information?: string
  user: number // User ID
  video_url?: string
  downloaded_video_path?: string
  start_coordinate?: string
  end_coordinate?: string
  is_active: boolean

  // フロントエンド用の追加フィールド（APIレスポンスには含まれない）
  metadataObj?: ScoreMetadata
  userObj?: User
  htmlContent?: string
  screenshots?: string[]
}
