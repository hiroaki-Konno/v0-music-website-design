import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
  const userId = Number.parseInt(params.user_id)
  const user = mockUsers.find((u) => u.user_id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: { params: { user_id: string } }) {
  try {
    const userId = Number.parseInt(params.user_id)
    const data = await request.json()

    const userIndex = mockUsers.findIndex((u) => u.user_id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 実際の実装ではデータベースを更新する処理を行う
    const updatedUser = {
      ...mockUsers[userIndex],
      ...data,
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { user_id: string } }) {
  const userId = Number.parseInt(params.user_id)
  const userIndex = mockUsers.findIndex((u) => u.user_id === userId)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // 実際の実装ではデータベースから削除する処理を行う

  return new NextResponse(null, { status: 204 })
}
