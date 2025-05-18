import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { generateSheetMusic } from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function UploadPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">楽譜生成</h1>
          <Button asChild variant="outline">
            <Link href="/">トップページに戻る</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>YouTubeの動画から楽譜を生成</CardTitle>
            <CardDescription>YouTubeの動画URLを入力し、楽譜を生成したい部分の座標を指定してください。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">基本情報</TabsTrigger>
                <TabsTrigger value="advanced">詳細設定</TabsTrigger>
              </TabsList>

              <form action={generateSheetMusic} className="space-y-6">
                <TabsContent value="basic" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="youtube-url">YouTube URL</Label>
                    <Input
                      id="youtube-url"
                      name="youtubeUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">楽譜のタイトル</Label>
                    <Input id="title" name="title" placeholder="例: 月の光" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="composer">作曲家</Label>
                      <Input id="composer" name="composer" placeholder="例: ドビュッシー" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instrument">楽器</Label>
                      <Input id="instrument" name="instrument" placeholder="例: ピアノ" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">楽譜領域の座標指定</Label>
                    <Textarea
                      id="coordinates"
                      name="coordinates"
                      placeholder="動画内の楽譜が表示されている領域の座標を指定してください。例: x1,y1,x2,y2"
                    />
                    <p className="text-sm text-muted-foreground">
                      座標は左上を(0,0)として、右下までの範囲を指定します。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="captureInterval">キャプチャ間隔 (秒)</Label>
                    <Input
                      id="captureInterval"
                      name="captureInterval"
                      type="number"
                      min="1"
                      step="1"
                      defaultValue="5"
                      placeholder="5"
                    />
                    <p className="text-sm text-muted-foreground">
                      動画から何秒ごとにスクリーンショットを撮るかを指定します。
                    </p>
                  </div>

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
                    <p className="text-sm text-muted-foreground">生成するHTMLファイルのテンプレートを選択します。</p>
                  </div>
                </TabsContent>

                <Button type="submit" className="w-full">
                  楽譜を生成する
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              生成には数分かかる場合があります。生成が完了すると通知されます。
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
