import { type NextRequest, NextResponse } from "next/server"
import { mockScores, mockScoreMetadata, mockUsers } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { score_id: string } }) {
  const scoreId = Number.parseInt(params.score_id)
  const score = mockScores.find((s) => s.score_id === scoreId)

  if (!score) {
    return NextResponse.json({ error: "Score not found" }, { status: 404 })
  }

  // メタデータとユーザー情報を追加
  const metadata = mockScoreMetadata.find((m) => m.metadata_id === score.metadata)
  const user = mockUsers.find((u) => u.user_id === score.user)

  return NextResponse.json({
    ...score,
    metadataObj: metadata,
    userObj: user,
  })
}

export async function PUT(request: NextRequest, { params }: { params: { score_id: string } }) {
  try {
    const scoreId = Number.parseInt(params.score_id)
    const data = await request.json()

    const scoreIndex = mockScores.findIndex((s) => s.score_id === scoreId)

    if (scoreIndex === -1) {
      return NextResponse.json({ error: "Score not found" }, { status: 404 })
    }

    // 実際の実装ではデータベースを更新する処理を行う
    const updatedScore = {
      ...mockScores[scoreIndex],
      ...data,
    }

    return NextResponse.json(updatedScore)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { score_id: string } }) {
  const scoreId = Number.parseInt(params.score_id)
  const scoreIndex = mockScores.findIndex((s) => s.score_id === scoreId)

  if (scoreIndex === -1) {
    return NextResponse.json({ error: "Score not found" }, { status: 404 })
  }

  // 実際の実装ではデータベースから削除する処理を行う

  return new NextResponse(null, { status: 204 })
}
