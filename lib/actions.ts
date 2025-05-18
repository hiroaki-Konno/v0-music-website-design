"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateHtmlFromScreenshots } from "@/lib/html-generator"

// 楽譜を生成するサーバーアクション
export async function generateSheetMusic(formData: FormData) {
  // フォームデータを取得
  const youtubeUrl = formData.get("youtubeUrl") as string
  const title = formData.get("title") as string
  const composer = formData.get("composer") as string
  const instrument = formData.get("instrument") as string
  const coordinates = formData.get("coordinates") as string
  const captureInterval = Number.parseInt((formData.get("captureInterval") as string) || "5")
  const htmlTemplate = (formData.get("htmlTemplate") as string) || "default"

  // バリデーション
  if (!youtubeUrl || !title) {
    throw new Error("YouTubeのURLとタイトルは必須です")
  }

  // 実際の実装では、YouTubeの動画から楽譜を生成する処理を行います
  // ここではモックデータを返します
  const newSheetMusicId = "sheet_" + Date.now()

  // モックのスクリーンショット画像URL
  const mockScreenshots = [
    "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
    "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
    "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
  ]

  // HTMLコンテンツを生成
  const htmlContent = generateHtmlFromScreenshots({
    title,
    composer,
    screenshots: mockScreenshots,
    template: htmlTemplate,
  })

  // 楽譜データをデータベースに保存する処理（モック）
  console.log("楽譜生成リクエスト:", {
    id: newSheetMusicId,
    youtubeUrl,
    title,
    composer,
    instrument,
    coordinates,
    captureInterval,
    htmlTemplate,
    screenshotCount: mockScreenshots.length,
    htmlContent,
    createdAt: new Date().toISOString(),
  })

  // キャッシュを更新
  revalidatePath("/")

  // 生成された楽譜の詳細ページにリダイレクト
  redirect(`/sheet-music/${newSheetMusicId}`)
}

// 楽譜情報を更新するサーバーアクション
export async function updateSheetMusic(id: string, formData: FormData) {
  // フォームデータを取得
  const updateType = formData.get("updateType") as string

  if (updateType === "html") {
    // HTMLコンテンツの更新
    const htmlContent = formData.get("htmlContent") as string

    if (!htmlContent) {
      throw new Error("HTMLコンテンツは必須です")
    }

    // 実際の実装では、データベースのHTMLコンテンツを更新する処理を行います
    console.log("HTML更新リクエスト:", {
      id,
      htmlContent,
      updatedAt: new Date().toISOString(),
    })
  } else {
    // 基本情報の更新
    const title = formData.get("title") as string
    const composer = formData.get("composer") as string
    const instrument = formData.get("instrument") as string
    const description = formData.get("description") as string

    // バリデーション
    if (!title) {
      throw new Error("タイトルは必須です")
    }

    // 実際の実装では、データベースの楽譜情報を更新する処理を行います
    console.log("楽譜更新リクエスト:", {
      id,
      title,
      composer,
      instrument,
      description,
      updatedAt: new Date().toISOString(),
    })
  }

  // キャッシュを更新
  revalidatePath(`/sheet-music/${id}`)
  revalidatePath("/")

  // 楽譜詳細ページにリダイレクト
  redirect(`/sheet-music/${id}`)
}

// HTMLを再生成するサーバーアクション
export async function regenerateHtml(id: string, formData: FormData) {
  // フォームデータを取得
  const htmlTemplate = (formData.get("htmlTemplate") as string) || "default"

  // 実際の実装では、楽譜データを取得してHTMLを再生成する処理を行います
  const sheetMusic = await import("@/lib/data").then((m) => m.getSheetMusic(id))

  if (!sheetMusic) {
    throw new Error("楽譜が見つかりません")
  }

  // モックのスクリーンショット画像URL
  const mockScreenshots = [
    "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
    "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
    "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
  ]

  // HTMLコンテンツを再生成
  const htmlContent = generateHtmlFromScreenshots({
    title: sheetMusic.title,
    composer: sheetMusic.composer,
    screenshots: mockScreenshots,
    template: htmlTemplate,
  })

  // 実際の実装では、データベースのHTMLコンテンツを更新する処理を行います
  console.log("HTML再生成リクエスト:", {
    id,
    htmlTemplate,
    htmlContent,
    updatedAt: new Date().toISOString(),
  })

  // キャッシュを更新
  revalidatePath(`/sheet-music/${id}`)

  // 楽譜詳細ページにリダイレクト
  redirect(`/sheet-music/${id}`)
}
