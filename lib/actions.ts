"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateHtmlFromScreenshots } from "@/lib/html-generator"
import type { Score, ScoreMetadata } from "./models"

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

  try {
    // 1. メタデータを作成
    const metadataResponse = await fetch("/api/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genre: "クラシック",
        duration: captureInterval * 10, // 仮の値
        description: `${title} - ${composer || "不明"}`,
        tags: [instrument || "不明"],
      }),
    })

    if (!metadataResponse.ok) {
      throw new Error("メタデータの作成に失敗しました")
    }

    const metadata: ScoreMetadata = await metadataResponse.json()

    // 2. 楽譜を作成
    const scoreResponse = await fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: metadata.metadata_id,
        title,
        composer,
        instrument,
        user: 1, // 現在のユーザーID
        video_url: youtubeUrl,
        start_coordinate: coordinates || "0,0,1920,1080",
        end_coordinate: coordinates || "0,0,1920,1080",
      }),
    })

    if (!scoreResponse.ok) {
      throw new Error("楽譜の作成に失敗しました")
    }

    const score: Score = await scoreResponse.json()

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

    // 3. 楽譜を更新してHTMLコンテンツを追加
    await fetch(`/api/scores/${score.score_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generated_score_url: `/api/scores/${score.score_id}/download/html`,
        htmlContent,
      }),
    })

    // キャッシュを更新
    revalidatePath("/")

    // 生成された楽譜の詳細ページにリダイレクト
    redirect(`/sheet-music/${score.score_id}`)
  } catch (error) {
    console.error("楽譜生成エラー:", error)
    throw error
  }
}

// 楽譜情報を更新するサーバーアクション
export async function updateSheetMusic(id: string, formData: FormData) {
  const updateType = formData.get("updateType") as string
  const scoreId = Number.parseInt(id)

  try {
    if (updateType === "html") {
      // HTMLコンテンツの更新
      const htmlContent = formData.get("htmlContent") as string

      if (!htmlContent) {
        throw new Error("HTMLコンテンツは必須です")
      }

      await fetch(`/api/scores/${scoreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          htmlContent,
        }),
      })
    } else {
      // 基本情報の更新
      const title = formData.get("title") as string
      const composer = formData.get("composer") as string
      const instrument = formData.get("instrument") as string
      const description = formData.get("description") as string

      if (!title) {
        throw new Error("タイトルは必須です")
      }

      // 楽譜情報を取得
      const scoreResponse = await fetch(`/api/scores/${scoreId}`)
      if (!scoreResponse.ok) {
        throw new Error("楽譜の取得に失敗しました")
      }
      const score: Score = await scoreResponse.json()

      // 楽譜情報を更新
      await fetch(`/api/scores/${scoreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          composer,
          instrument,
        }),
      })

      // メタデータを更新
      if (score.metadata && description) {
        await fetch(`/api/metadata/${score.metadata}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
          }),
        })
      }
    }

    // キャッシュを更新
    revalidatePath(`/sheet-music/${id}`)
    revalidatePath("/")

    // 楽譜詳細ページにリダイレクト
    redirect(`/sheet-music/${id}`)
  } catch (error) {
    console.error("楽譜更新エラー:", error)
    throw error
  }
}

// HTMLを再生成するサーバーアクション
export async function regenerateHtml(id: string, formData: FormData) {
  const htmlTemplate = (formData.get("htmlTemplate") as string) || "default"
  const scoreId = Number.parseInt(id)

  try {
    // 楽譜データを取得
    const scoreResponse = await fetch(`/api/scores/${scoreId}`)
    if (!scoreResponse.ok) {
      throw new Error("楽譜の取得に失敗しました")
    }
    const score: Score = await scoreResponse.json()

    // モックのスクリーンショット画像URL
    const mockScreenshots = [
      "/placeholder.svg?height=300&width=500&text=スクリーンショット1",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット2",
      "/placeholder.svg?height=300&width=500&text=スクリーンショット3",
    ]

    // HTMLコンテンツを再生成
    const htmlContent = generateHtmlFromScreenshots({
      title: score.title,
      composer: score.composer,
      screenshots: mockScreenshots,
      template: htmlTemplate,
    })

    // 楽譜を更新してHTMLコンテンツを追加
    await fetch(`/api/scores/${scoreId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        htmlContent,
      }),
    })

    // キャッシュを更新
    revalidatePath(`/sheet-music/${id}`)

    // 楽譜詳細ページにリダイレクト
    redirect(`/sheet-music/${id}`)
  } catch (error) {
    console.error("HTML再生成エラー:", error)
    throw error
  }
}
