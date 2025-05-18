import { type NextRequest, NextResponse } from "next/server"
import { mockYourModels } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const model = mockYourModels.find((m) => m.id === id)

  if (!model) {
    return NextResponse.json({ error: "Model not found" }, { status: 404 })
  }

  return NextResponse.json(model)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const modelIndex = mockYourModels.findIndex((m) => m.id === id)

    if (modelIndex === -1) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    // 実際の実装ではデータベースを更新する処理を行う
    const updatedModel = {
      ...mockYourModels[modelIndex],
      ...data,
    }

    return NextResponse.json(updatedModel)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const modelIndex = mockYourModels.findIndex((m) => m.id === id)

  if (modelIndex === -1) {
    return NextResponse.json({ error: "Model not found" }, { status: 404 })
  }

  // 実際の実装ではデータベースから削除する処理を行う

  return new NextResponse(null, { status: 204 })
}
