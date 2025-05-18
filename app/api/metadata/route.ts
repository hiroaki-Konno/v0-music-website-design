import { type NextRequest, NextResponse } from "next/server"
import { mockScoreMetadata } from "@/lib/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(mockScoreMetadata)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 実際の実装ではデータベースに保存する処理を行う
    const newMetadata = {
      metadata_id: Math.max(...mockScoreMetadata.map((m) => m.metadata_id)) + 1,
      ...data,
      upload_date: new Date().toISOString(),
      is_active: true,
    }

    return NextResponse.json(newMetadata, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
