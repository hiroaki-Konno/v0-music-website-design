import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSheetMusic } from "@/lib/data"

interface SheetMusicPageProps {
  params: {
    id: string
  }
}

export default async function SheetMusicPage({ params }: SheetMusicPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const sheetMusic = await getSheetMusic(params.id)

  if (!sheetMusic) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{sheetMusic.title}</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">トップページに戻る</Link>
            </Button>
            <Button asChild>
              <Link href={`/sheet-music/${params.id}/manage`}>楽譜を管理</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="preview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview">プレビュー</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube動画</TabsTrigger>
                    <TabsTrigger value="html">HTMLソース</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="border rounded-md p-4">
                    <div className="bg-white p-4 rounded-md">
                      <iframe
                        src={`/api/sheet-music/${params.id}/preview`}
                        className="w-full min-h-[600px] border-0"
                        title={`${sheetMusic.title}のプレビュー`}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="youtube" className="border rounded-md p-4">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      {sheetMusic.youtubeUrl ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYoutubeId(sheetMusic.youtubeUrl)}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <p className="text-muted-foreground">YouTube URLが設定されていません</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="html" className="border rounded-md p-4">
                    <div className="bg-zinc-900 text-zinc-100 p-4 rounded-md overflow-auto max-h-[600px]">
                      <pre className="text-sm">
                        <code>{sheetMusic.htmlContent || "<!-- HTMLコンテンツがまだ生成されていません -->"}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">楽譜情報</h2>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">タイトル</p>
                      <p>{sheetMusic.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">作曲家</p>
                      <p>{sheetMusic.composer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">楽器</p>
                      <p>{sheetMusic.instrument}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">作成日</p>
                      <p>{new Date(sheetMusic.createdAt).toLocaleDateString("ja-JP")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">スクリーンショット数</p>
                      <p>{sheetMusic.screenshotCount || "0"} 枚</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">ダウンロード</h2>
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <Link href={`/api/sheet-music/${params.id}/download/html`}>HTML形式でダウンロード</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/api/sheet-music/${params.id}/download/pdf`}>PDF形式でダウンロード</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// YouTube URLからIDを抽出する関数
function getYoutubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}
