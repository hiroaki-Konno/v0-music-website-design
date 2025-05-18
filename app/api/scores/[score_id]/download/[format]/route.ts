import { type NextRequest, NextResponse } from "next/server"
import { getSheetMusic } from "@/lib/data"
import { generatePdf } from "@/lib/pdf-generator"

export async function GET(request: NextRequest, { params }: { params: { score_id: string; format: string } }) {
  const score = await getSheetMusic(params.score_id)

  if (!score) {
    return NextResponse.json({ error: "楽譜が見つかりません" }, { status: 404 })
  }

  const format = params.format.toLowerCase()

  if (format === "html") {
    if (!score.htmlContent) {
      return NextResponse.json({ error: "HTMLコンテンツがありません" }, { status: 404 })
    }

    return new NextResponse(score.htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${score.title}.html"`,
      },
    })
  } else if (format === "pdf") {
    if (!score.htmlContent) {
      return NextResponse.json({ error: "HTMLコンテンツがありません" }, { status: 404 })
    }

    try {
      const pdfBuffer = await generatePdf(score.htmlContent, score.title)

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${score.title}.pdf"`,
        },
      })
    } catch (error) {
      console.error("PDF生成エラー:", error)
      return NextResponse.json({ error: "PDFの生成に失敗しました" }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "サポートされていないフォーマットです" }, { status: 400 })
  }
}
