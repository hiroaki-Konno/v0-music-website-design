import { type NextRequest, NextResponse } from "next/server"
import { mockScores, mockScoreMetadata, mockUsers } from "@/lib/data"

export async function GET(request: NextRequest) {
  // メタデータとユーザー情報を追加
  const scoresWithDetails = mockScores.map((score) => {
    const metadata = mockScoreMetadata.find((m) => m.metadata_id === score.metadata)
    const user = mockUsers.find((u) => u.user_id === score.user)

    return {
      ...score,
      metadataObj: metadata,
      userObj: user,
    }
  })

  return NextResponse.json(scoresWithDetails)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 実際の実装ではデータベースに保存する処理を行う
    const newScore = {
      score_id: Math.max(...mockScores.map((s) => s.score_id)) + 1,
      ...data,
      is_active: true,
    }

    return NextResponse.json(newScore, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
