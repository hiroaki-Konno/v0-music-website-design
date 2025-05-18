import { type NextRequest, NextResponse } from "next/server"
import { mockYourModels } from "@/lib/data"

export async function GET(request: NextRequest) {
  return NextResponse.json(mockYourModels)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 実際の実装ではデータベースに保存する処理を行う
    const newModel = {
      id: mockYourModels.length + 1,
      ...data,
      is_active: true,
    }

    return NextResponse.json(newModel, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
