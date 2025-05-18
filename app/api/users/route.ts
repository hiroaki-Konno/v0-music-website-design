import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(mockUsers)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 実際の実装ではデータベースに保存する処理を行う
    const newUser = {
      user_id: Math.max(...mockUsers.map((u) => u.user_id)) + 1,
      ...data,
      is_active: true,
    }

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
