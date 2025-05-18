"use server"

// 楽譜データの型定義
export interface SheetMusic {
  id: string
  title: string
  composer: string
  instrument: string
  description?: string
  youtubeUrl: string
  createdAt: string
  updatedAt?: string
  htmlContent?: string
  screenshotCount?: number
  screenshots?: string[]
}

// モックデータ
const mockSheetMusics: SheetMusic[] = [
  {
    id: "1",
    title: "月の光",
    composer: "ドビュッシー",
    instrument: "ピアノ",
    description: "ドビュッシーの代表作「ベルガマスク組曲」の第3曲",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    createdAt: "2023-01-01T00:00:00.000Z",
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
    screenshotCount: 3,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
    ],
  },
  {
    id: "2",
    title: "エリーゼのために",
    composer: "ベートーヴェン",
    instrument: "ピアノ",
    description: "ベートーヴェンの有名な小品",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    createdAt: "2023-01-02T00:00:00.000Z",
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
    screenshotCount: 2,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
    ],
  },
  {
    id: "3",
    title: "G線上のアリア",
    composer: "バッハ",
    instrument: "バイオリン",
    description: "バッハの管弦楽組曲第3番の第2楽章",
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    createdAt: "2023-01-03T00:00:00.000Z",
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
    screenshotCount: 4,
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット4",
    ],
  },
  {
    id: "4",
    title: "トルコ行進曲",
    composer: "モーツァルト",
    instrument: "ピアノ",
    description: "モーツァルトのピアノソナタ第11番の第3楽章",
    youtubeUrl: "https://www.youtube.com/watch?v=example4",
    createdAt: "2023-01-04T00:00:00.000Z",
  },
  {
    id: "5",
    title: "四季 - 春",
    composer: "ヴィヴァルディ",
    instrument: "バイオリン",
    description: "ヴィヴァルディの「四季」より「春」",
    youtubeUrl: "https://www.youtube.com/watch?v=example5",
    createdAt: "2023-01-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "ノクターン Op.9 No.2",
    composer: "ショパン",
    instrument: "ピアノ",
    description: "ショパンの代表的なノクターン",
    youtubeUrl: "https://www.youtube.com/watch?v=example6",
    createdAt: "2023-01-06T00:00:00.000Z",
  },
]

// 楽譜データを取得する関数
export async function getSheetMusic(id: string): Promise<SheetMusic | null> {
  // 実際の実装ではデータベースから楽譜データを取得します
  // ここではモックデータを返します
  const sheetMusic = mockSheetMusics.find((sheet) => sheet.id === id)
  return sheetMusic || null
}

// 楽譜を検索する関数
export async function searchSheetMusic(query: string): Promise<SheetMusic[]> {
  // 実際の実装ではデータベースから楽譜データを検索します
  // ここではモックデータをフィルタリングして返します
  const lowerQuery = query.toLowerCase()
  return mockSheetMusics.filter(
    (sheet) =>
      sheet.title.toLowerCase().includes(lowerQuery) ||
      sheet.composer.toLowerCase().includes(lowerQuery) ||
      sheet.instrument.toLowerCase().includes(lowerQuery),
  )
}
