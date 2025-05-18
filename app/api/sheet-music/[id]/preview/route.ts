import { type NextRequest, NextResponse } from "next/server"
import { getSheetMusic } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const sheetMusic = await getSheetMusic(params.id)

  if (!sheetMusic || !sheetMusic.htmlContent) {
    return new NextResponse("楽譜が見つからないか、HTMLコンテンツがありません", { status: 404 })
  }

  return new NextResponse(sheetMusic.htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
