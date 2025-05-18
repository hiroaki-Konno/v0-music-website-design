import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { searchSheetMusic } from "@/lib/data"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const query = searchParams.q || ""
  const results = query ? await searchSheetMusic(query) : []

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">楽譜検索</h1>
          <Button asChild variant="outline">
            <Link href="/">トップページに戻る</Link>
          </Button>
        </div>

        <div className="mb-8">
          <form className="flex gap-2">
            <Input name="q" placeholder="タイトル、作曲家、楽器で検索..." defaultValue={query} className="flex-1" />
            <Button type="submit">検索</Button>
          </form>
        </div>

        {query && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              "{query}" の検索結果: {results.length}件
            </h2>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                    <h3 className="font-medium">{result.title}</h3>
                    <p className="text-sm text-muted-foreground">作曲: {result.composer}</p>
                    <p className="text-sm text-muted-foreground">楽器: {result.instrument}</p>
                    <div className="mt-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/sheet-music/${result.id}`}>詳細を見る</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">検索結果が見つかりませんでした。</p>
                <p className="text-muted-foreground">別のキーワードで検索してみてください。</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
