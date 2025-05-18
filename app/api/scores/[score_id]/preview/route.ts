import { type NextRequest, NextResponse } from "next/server"
import { getSheetMusic } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { score_id: string } }) {
  const score = await getSheetMusic(params.score_id)

  if (!score || !score.htmlContent) {
    return new NextResponse("楽譜が見つからないか、HTMLコンテンツがありません", { status: 404 })
  }

  return new NextResponse(score.htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
