import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">楽譜生成・管理アプリ</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">アプリケーションの概要</h2>
          <p className="text-muted-foreground mb-4">
            YouTubeの動画から楽譜を自動生成し、管理できるアプリケーションです。
            お気に入りの楽曲の楽譜を簡単に作成、保存、共有できます。
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link href="/upload">楽譜を生成する</Link>
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">新着楽譜</h2>
            <div className="grid gap-4">
              <SheetMusicCard title="月の光" composer="ドビュッシー" instrument="ピアノ" id="1" />
              <SheetMusicCard title="エリーゼのために" composer="ベートーヴェン" instrument="ピアノ" id="2" />
              <SheetMusicCard title="G線上のアリア" composer="バッハ" instrument="バイオリン" id="3" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">人気の楽譜</h2>
            <div className="grid gap-4">
              <SheetMusicCard title="トルコ行進曲" composer="モーツァルト" instrument="ピアノ" id="4" />
              <SheetMusicCard title="四季 - 春" composer="ヴィヴァルディ" instrument="バイオリン" id="5" />
              <SheetMusicCard title="ノクターン Op.9 No.2" composer="ショパン" instrument="ピアノ" id="6" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function SheetMusicCard({
  title,
  composer,
  instrument,
  id,
}: {
  title: string
  composer: string
  instrument: string
  id: string
}) {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">作曲: {composer}</p>
      <p className="text-sm text-muted-foreground">楽器: {instrument}</p>
      <div className="mt-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/sheet-music/${id}`}>詳細を見る</Link>
        </Button>
      </div>
    </div>
  )
}
