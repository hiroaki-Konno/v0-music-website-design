import { type NextRequest, NextResponse } from "next/server"
import { getSheetMusic } from "@/lib/data"
import { generatePdf } from "@/lib/pdf-generator"

export async function GET(request: NextRequest, { params }: { params: { id: string; format: string } }) {
  const sheetMusic = await getSheetMusic(params.id)

  if (!sheetMusic) {
    return new NextResponse("楽譜が見つかりません", { status: 404 })
  }

  const format = params.format.toLowerCase()

  if (format === "html") {
    if (!sheetMusic.htmlContent) {
      return new NextResponse("HTMLコンテンツがありません", { status: 404 })
    }

    return new NextResponse(sheetMusic.htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${sheetMusic.title}.html"`,
      },
    })
  } else if (format === "pdf") {
    if (!sheetMusic.htmlContent) {
      return new NextResponse("HTMLコンテンツがありません", { status: 404 })
    }

    try {
      const pdfBuffer = await generatePdf(sheetMusic.htmlContent, sheetMusic.title)

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${sheetMusic.title}.pdf"`,
        },
      })
    } catch (error) {
      console.error("PDF生成エラー:", error)
      return new NextResponse("PDFの生成に失敗しました", { status: 500 })
    }
  } else {
    return new NextResponse("サポートされていないフォーマットです", { status: 400 })
  }
}
