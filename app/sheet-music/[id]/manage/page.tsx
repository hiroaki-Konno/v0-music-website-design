import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { getSheetMusic } from "@/lib/data"
import { updateSheetMusic, regenerateHtml } from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ManageSheetMusicPageProps {
  params: {
    id: string
  }
}

export default async function ManageSheetMusicPage({ params }: ManageSheetMusicPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const sheetMusic = await getSheetMusic(params.id)

  if (!sheetMusic) {
    redirect("/")
  }

  const updateSheetMusicWithId = updateSheetMusic.bind(null, params.id)
  const regenerateHtmlWithId = regenerateHtml.bind(null, params.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">楽譜管理</h1>
          <Button asChild variant="outline">
            <Link href={`/sheet-music/${params.id}`}>楽譜詳細に戻る</Link>
          </Button>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="mb-6">
            <TabsTrigger value="info">基本情報</TabsTrigger>
            <TabsTrigger value="html">HTMLエディタ</TabsTrigger>
            <TabsTrigger value="screenshots">スクリーンショット</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>楽譜情報の編集</CardTitle>
                <CardDescription>
                  楽譜の基本情報を編集できます。変更を保存するには「保存」ボタンをクリックしてください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateSheetMusicWithId} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">楽譜のタイトル</Label>
                    <Input id="title" name="title" defaultValue={sheetMusic.title} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="composer">作曲家</Label>
                      <Input id="composer" name="composer" defaultValue={sheetMusic.composer} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instrument">楽器</Label>
                      <Input id="instrument" name="instrument" defaultValue={sheetMusic.instrument} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">説明</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={sheetMusic.description || ""}
                      placeholder="楽譜の説明を入力してください"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/sheet-music/${params.id}`}>キャンセル</Link>
                    </Button>
                    <Button type="submit">保存</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="html">
            <Card>
              <CardHeader>
                <CardTitle>HTMLエディタ</CardTitle>
                <CardDescription>
                  楽譜のHTMLコードを直接編集できます。編集後は「HTMLを更新」ボタンをクリックしてください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateSheetMusicWithId} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="htmlContent">HTMLコード</Label>
                    <Textarea
                      id="htmlContent"
                      name="htmlContent"
                      defaultValue={sheetMusic.htmlContent || ""}
                      placeholder="<!DOCTYPE html>..."
                      className="font-mono h-[400px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      HTMLコードを直接編集できます。画像参照のパスは相対パスで指定してください。
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/sheet-music/${params.id}`}>キャンセル</Link>
                    </Button>
                    <Button type="submit" name="updateType" value="html">
                      HTMLを更新
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="screenshots">
            <Card>
              <CardHeader>
                <CardTitle>スクリーンショット管理</CardTitle>
                <CardDescription>楽譜を構成するスクリーンショットを管理します。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-4">スクリーンショット一覧</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {sheetMusic.screenshots ? (
                        sheetMusic.screenshots.map((screenshot, index) => (
                          <div key={index} className="border rounded-md p-2">
                            <img
                              src={screenshot || "/placeholder.svg"}
                              alt={`スクリーンショット ${index + 1}`}
                              className="w-full h-auto"
                            />
                            <p className="text-center text-sm mt-2">#{index + 1}</p>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-center text-muted-foreground py-8">
                          スクリーンショットがありません
                        </p>
                      )}
                    </div>
                  </div>

                  <form action={regenerateHtmlWithId} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="htmlTemplate">HTMLテンプレート</Label>
                      <select
                        id="htmlTemplate"
                        name="htmlTemplate"
                        className="w-full p-2 border rounded-md"
                        defaultValue="default"
                      >
                        <option value="default">デフォルト</option>
                        <option value="compact">コンパクト</option>
                        <option value="print">印刷向け</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full">
                      HTMLを再生成
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Card>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="destructive">楽譜を削除</Button>
              <Button variant="outline" asChild>
                <Link href={`/sheet-music/${params.id}`}>楽譜詳細に戻る</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
