interface GenerateHtmlOptions {
  title: string
  composer?: string
  screenshots: string[]
  template?: string
}

export function generateHtmlFromScreenshots(options: GenerateHtmlOptions): string {
  const { title, composer = "", screenshots, template = "default" } = options

  // スクリーンショットがない場合は空のHTMLを返す
  if (!screenshots || screenshots.length === 0) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>スクリーンショットがありません</p>
</body>
</html>
    `
  }

  // テンプレートに応じたスタイルを選択
  let style = ""

  switch (template) {
    case "compact":
      style = `
    body { font-family: Arial, sans-serif; margin: 0; padding: 10px; background-color: #f8f8f8; }
    .sheet-music-container { max-width: 100%; margin: 0 auto; }
    .sheet-music-header { text-align: center; margin-bottom: 10px; }
    .sheet-music-header h1 { margin: 0; font-size: 18px; }
    .sheet-music-header h2 { margin: 5px 0 0; font-size: 14px; color: #666; }
    .sheet-music-page { margin-bottom: 5px; }
    .sheet-music-page img { width: 100%; height: auto; display: block; }
      `
      break
    case "print":
      style = `
    @page { size: A4; margin: 1cm; }
    body { font-family: serif; margin: 0; padding: 0; }
    .sheet-music-container { width: 100%; }
    .sheet-music-header { text-align: center; margin-bottom: 20px; }
    .sheet-music-header h1 { margin: 0; font-size: 24px; }
    .sheet-music-header h2 { margin: 5px 0 0; font-size: 18px; }
    .sheet-music-page { margin-bottom: 20px; page-break-inside: avoid; }
    .sheet-music-page img { width: 100%; height: auto; display: block; }
    @media print {
      .sheet-music-page { page-break-inside: avoid; }
    }
      `
      break
    default: // default template
      style = `
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .sheet-music-container { max-width: 800px; margin: 0 auto; }
    .sheet-music-header { text-align: center; margin-bottom: 20px; }
    .sheet-music-header h1 { margin: 0; font-size: 24px; }
    .sheet-music-header h2 { margin: 5px 0 0; font-size: 18px; color: #666; }
    .sheet-music-page { margin-bottom: 10px; }
    .sheet-music-page img { width: 100%; height: auto; display: block; border: 1px solid #eee; }
      `
  }

  // スクリーンショットのHTMLを生成
  const screenshotsHtml = screenshots
    .map(
      (screenshot, index) => `
    <div class="sheet-music-page">
      <img src="${screenshot}" alt="楽譜ページ ${index + 1}">
    </div>
  `,
    )
    .join("")

  // 完全なHTMLを生成
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}${composer ? ` - ${composer}` : ""}</title>
  <style>
    ${style}
  </style>
</head>
<body>
  <div class="sheet-music-container">
    <div class="sheet-music-header">
      <h1>${title}</h1>
      ${composer ? `<h2>${composer}</h2>` : ""}
    </div>
    ${screenshotsHtml}
  </div>
</body>
</html>
  `
}
