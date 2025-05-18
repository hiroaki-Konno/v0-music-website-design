import { type NextRequest, NextResponse } from "next/server"
import { mockGoogleAuths } from "@/lib/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(mockGoogleAuths)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 実際の実装ではデータベースに保存する処理を行う
    const newAuth = {
      auth_id: Math.max(...mockGoogleAuths.map((a) => a.auth_id)) + 1,
      ...data,
      token_expiry: new Date(Date.now() + 3600000).toISOString(), // 1時間後
    }

    return NextResponse.json(newAuth, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
