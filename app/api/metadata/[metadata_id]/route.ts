import { type NextRequest, NextResponse } from "next/server"
import { mockScoreMetadata } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { metadata_id: string } }) {
  const metadataId = Number.parseInt(params.metadata_id)
  const metadata = mockScoreMetadata.find((m) => m.metadata_id === metadataId)

  if (!metadata) {
    return NextResponse.json({ error: "Metadata not found" }, { status: 404 })
  }

  return NextResponse.json(metadata)
}

export async function PUT(request: NextRequest, { params }: { params: { metadata_id: string } }) {
  try {
    const metadataId = Number.parseInt(params.metadata_id)
    const data = await request.json()

    const metadataIndex = mockScoreMetadata.findIndex((m) => m.metadata_id === metadataId)

    if (metadataIndex === -1) {
      return NextResponse.json({ error: "Metadata not found" }, { status: 404 })
    }

    // 実際の実装ではデータベースを更新する処理を行う
    const updatedMetadata = {
      ...mockScoreMetadata[metadataIndex],
      ...data,
    }

    return NextResponse.json(updatedMetadata)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { metadata_id: string } }) {
  const metadataId = Number.parseInt(params.metadata_id)
  const metadataIndex = mockScoreMetadata.findIndex((m) => m.metadata_id === metadataId)

  if (metadataIndex === -1) {
    return NextResponse.json({ error: "Metadata not found" }, { status: 404 })
  }

  // 実際の実装ではデータベースから削除する処理を行う

  return new NextResponse(null, { status: 204 })
}
