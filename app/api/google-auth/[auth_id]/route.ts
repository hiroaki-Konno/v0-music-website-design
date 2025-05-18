import { type NextRequest, NextResponse } from "next/server"
import { mockGoogleAuths } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { auth_id: string } }) {
  const authId = Number.parseInt(params.auth_id)
  const auth = mockGoogleAuths.find((a) => a.auth_id === authId)

  if (!auth) {
    return NextResponse.json({ error: "Auth not found" }, { status: 404 })
  }

  return NextResponse.json(auth)
}

export async function PUT(request: NextRequest, { params }: { params: { auth_id: string } }) {
  try {
    const authId = Number.parseInt(params.auth_id)
    const data = await request.json()

    const authIndex = mockGoogleAuths.findIndex((a) => a.auth_id === authId)

    if (authIndex === -1) {
      return NextResponse.json({ error: "Auth not found" }, { status: 404 })
    }

    // 実際の実装ではデータベースを更新する処理を行う
    const updatedAuth = {
      ...mockGoogleAuths[authIndex],
      ...data,
    }

    return NextResponse.json(updatedAuth)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { auth_id: string } }) {
  const authId = Number.parseInt(params.auth_id)
  const authIndex = mockGoogleAuths.findIndex((a) => a.auth_id === authId)

  if (authIndex === -1) {
    return NextResponse.json({ error: "Auth not found" }, { status: 404 })
  }

  // 実際の実装ではデータベースから削除する処理を行う

  return new NextResponse(null, { status: 204 })
}
