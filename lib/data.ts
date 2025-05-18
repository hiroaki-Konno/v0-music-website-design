"use server"

import type { User, GoogleAuth, ScoreMetadata, Score, YourModel } from "./models"

// モックユーザーデータ
export const mockUsers: User[] = [
  {
    user_id: 1,
    username: "山田太郎",
    email: "yamada@example.com",
    profile_information: "音楽愛好家です。ピアノを15年間演奏しています。",
    is_active: true,
  },
  {
    user_id: 2,
    username: "佐藤花子",
    email: "sato@example.com",
    profile_information: "バイオリン演奏者です。",
    is_active: true,
  },
]

// モックGoogle認証データ
export const mockGoogleAuths: GoogleAuth[] = [
  {
    auth_id: 1,
    user: 1,
    google_id_token: "mock_google_id_token_1",
    access_token: "mock_access_token_1",
    refresh_token: "mock_refresh_token_1",
    token_expiry: "2024-06-01T00:00:00.000Z",
  },
]

// モック楽譜メタデータ
export const mockScoreMetadata: ScoreMetadata[] = [
  {
    metadata_id: 1,
    genre: "クラシック",
    duration: 240,
    upload_date: "2023-01-01T00:00:00.000Z",
    description: "ドビュッシーの代表作「ベルガマスク組曲」の第3曲",
    tags: ["ピアノ", "印象派", "フランス"],
    is_active: true,
  },
  {
    metadata_id: 2,
    genre: "クラシック",
    duration: 180,
    upload_date: "2023-01-02T00:00:00.000Z",
    description: "ベートーヴェンの有名な小品",
    tags: ["ピアノ", "古典派", "ドイツ"],
    is_active: true,
  },
  {
    metadata_id: 3,
    genre: "クラシック",
    duration: 300,
    upload_date: "2023-01-03T00:00:00.000Z",
    description: "バッハの管弦楽組曲第3番の第2楽章",
    tags: ["バイオリン", "バロック", "ドイツ"],
    is_active: true,
  },
  {
    metadata_id: 4,
    genre: "クラシック",
    duration: 210,
    upload_date: "2023-01-04T00:00:00.000Z",
    description: "モーツァルトのピアノソナタ第11番の第3楽章",
    tags: ["ピアノ", "古典派", "オーストリア"],
    is_active: true,
  },
  {
    metadata_id: 5,
    genre: "クラシック",
    duration: 600,
    upload_date: "2023-01-05T00:00:00.000Z",
    description: "ヴィヴァルディの「四季」より「春」",
    tags: ["バイオリン", "バロック", "イタリア"],
    is_active: true,
  },
  {
    metadata_id: 6,
    genre: "クラシック",
    duration: 270,
    upload_date: "2023-01-06T00:00:00.000Z",
    description: "ショパンの代表的なノクターン",
    tags: ["ピアノ", "ロマン派", "ポーランド"],
    is_active: true,
  },
]

// モック楽譜データ
export const mockScores: Score[] = [
  {
    score_id: 1,
    metadata: 1,
    title: "月の光",
    composer: "ドビュッシー",
    instrument: "ピアノ",
    generated_score_url: "/api/scores/1/download/html",
    version_information: "1.0",
    user: 1,
    video_url: "https://www.youtube.com/watch?v=example1",
    downloaded_video_path: "/tmp/videos/example1.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>月の光 - ドビュッシー</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .sheet-music-container { max-width: 800px; margin: 0 auto; }
    .sheet-music-header { text-align: center; margin-bottom: 20px; }
    .sheet-music-page { margin-bottom: 10px; }
    .sheet-music-page img { width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <div class="sheet-music-container">
    <div class="sheet-music-header">
      <h1>月の光</h1>
      <h2>ドビュッシー</h2>
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット1" alt="楽譜ページ 1">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット2" alt="楽譜ページ 2">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット3" alt="楽譜ページ 3">
    </div>
  </div>
</body>
</html>
    `,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
    ],
  },
  {
    score_id: 2,
    metadata: 2,
    title: "エリーゼのために",
    composer: "ベートーヴェン",
    instrument: "ピアノ",
    generated_score_url: "/api/scores/2/download/html",
    version_information: "1.0",
    user: 1,
    video_url: "https://www.youtube.com/watch?v=example2",
    downloaded_video_path: "/tmp/videos/example2.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>エリーゼのために - ベートーヴェン</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .sheet-music-container { max-width: 800px; margin: 0 auto; }
    .sheet-music-header { text-align: center; margin-bottom: 20px; }
    .sheet-music-page { margin-bottom: 10px; }
    .sheet-music-page img { width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <div class="sheet-music-container">
    <div class="sheet-music-header">
      <h1>エリーゼのために</h1>
      <h2>ベートーヴェン</h2>
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット1" alt="楽譜ページ 1">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット2" alt="楽譜ページ 2">
    </div>
  </div>
</body>
</html>
    `,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
    ],
  },
  {
    score_id: 3,
    metadata: 3,
    title: "G線上のアリア",
    composer: "バッハ",
    instrument: "バイオリン",
    generated_score_url: "/api/scores/3/download/html",
    version_information: "1.0",
    user: 2,
    video_url: "https://www.youtube.com/watch?v=example3",
    downloaded_video_path: "/tmp/videos/example3.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>G線上のアリア - バッハ</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .sheet-music-container { max-width: 800px; margin: 0 auto; }
    .sheet-music-header { text-align: center; margin-bottom: 20px; }
    .sheet-music-page { margin-bottom: 10px; }
    .sheet-music-page img { width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <div class="sheet-music-container">
    <div class="sheet-music-header">
      <h1>G線上のアリア</h1>
      <h2>バッハ</h2>
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット1" alt="楽譜ページ 1">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット2" alt="楽譜ページ 2">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット3" alt="楽譜ページ 3">
    </div>
    <div class="sheet-music-page">
      <img src="/placeholder.svg?height=300&width=500&text=スクリーンショット4" alt="楽譜ページ 4">
    </div>
  </div>
</body>
</html>
    `,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット4",
    ],
  },
  {
    score_id: 4,
    metadata: 4,
    title: "トルコ行進曲",
    composer: "モーツァルト",
    instrument: "ピアノ",
    generated_score_url: "/api/scores/4/download/html",
    version_information: "1.0",
    user: 1,
    video_url: "https://www.youtube.com/watch?v=example4",
    downloaded_video_path: "/tmp/videos/example4.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
  },
  {
    score_id: 5,
    metadata: 5,
    title: "四季 - 春",
    composer: "ヴィヴァルディ",
    instrument: "バイオリン",
    generated_score_url: "/api/scores/5/download/html",
    version_information: "1.0",
    user: 2,
    video_url: "https://www.youtube.com/watch?v=example5",
    downloaded_video_path: "/tmp/videos/example5.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
  },
  {
    score_id: 6,
    metadata: 6,
    title: "ノクターン Op.9 No.2",
    composer: "ショパン",
    instrument: "ピアノ",
    generated_score_url: "/api/scores/6/download/html",
    version_information: "1.0",
    user: 1,
    video_url: "https://www.youtube.com/watch?v=example6",
    downloaded_video_path: "/tmp/videos/example6.mp4",
    start_coordinate: "0,0,1920,1080",
    end_coordinate: "0,0,1920,1080",
    is_active: true,
  },
]

// モックYourModelデータ
export const mockYourModels: YourModel[] = [
  {
    id: 1,
    title: "サンプルタイトル1",
    artist: "サンプルアーティスト1",
    album: "サンプルアルバム1",
    release_date: "2020-01-01",
    genre: "ポップ",
    is_active: true,
  },
  {
    id: 2,
    title: "サンプルタイトル2",
    artist: "サンプルアーティスト2",
    album: "サンプルアルバム2",
    release_date: "2021-02-15",
    genre: "ロック",
    is_active: true,
  },
]

// 楽譜データを取得する関数
export async function getSheetMusic(id: string): Promise<Score | null> {
  const scoreId = Number.parseInt(id)
  const score = mockScores.find((s) => s.score_id === scoreId)

  if (!score) return null

  // メタデータとユーザー情報を追加
  const metadata = mockScoreMetadata.find((m) => m.metadata_id === score.metadata)
  const user = mockUsers.find((u) => u.user_id === score.user)

  return {
    ...score,
    metadataObj: metadata,
    userObj: user,
  }
}

// 楽譜を検索する関数
export async function searchSheetMusic(query: string): Promise<Score[]> {
  const lowerQuery = query.toLowerCase()
  const filteredScores = mockScores.filter(
    (score) =>
      score.title.toLowerCase().includes(lowerQuery) ||
      (score.composer && score.composer.toLowerCase().includes(lowerQuery)) ||
      (score.instrument && score.instrument.toLowerCase().includes(lowerQuery)),
  )

  // メタデータとユーザー情報を追加
  return filteredScores.map((score) => {
    const metadata = mockScoreMetadata.find((m) => m.metadata_id === score.metadata)
    const user = mockUsers.find((u) => u.user_id === score.user)

    return {
      ...score,
      metadataObj: metadata,
      userObj: user,
    }
  })
}

// ユーザーデータを取得する関数
export async function getUser(id: number): Promise<User | null> {
  return mockUsers.find((user) => user.user_id === id) || null
}

// 現在のユーザーを取得する関数
export async function getCurrentUser(): Promise<User | null> {
  // セッションからユーザーIDを取得する代わりに、モックユーザーを返す
  return mockUsers[0] // 山田太郎をデフォルトユーザーとする
}
