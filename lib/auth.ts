"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// 認証セッションを取得する関数
export async function auth() {
  // 実際の実装ではGoogle認証などを使用します
  // ここではモックデータを返します
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  // モックユーザーデータ
  return {
    user: {
      id: "user_123",
      name: "山田太郎",
      email: "yamada@example.com",
      image: "/placeholder.svg?height=32&width=32&text=YT",
    },
  }
}

// Googleでサインインする関数
export async function signIn(provider: string, options?: { redirectTo?: string }) {
  // 実際の実装ではGoogle認証などを使用します
  // ここではクッキーを設定するだけのモック実装です
  cookies().set("session", "mock_session_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1週間
    path: "/",
  })

  redirect(options?.redirectTo || "/")
}

// サインアウトする関数
export async function signOut() {
  cookies().delete("session")
  redirect("/login")
}
