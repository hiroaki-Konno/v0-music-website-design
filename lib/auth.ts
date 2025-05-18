"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUser } from "./data"

// 認証セッションを取得する関数
export async function auth() {
  // クッキーからセッションIDを取得
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // 実際の実装ではセッションIDからユーザー情報を取得する
    // ここではモックユーザーデータを返す
    const user = await getUser(1) // 山田太郎のユーザーID

    if (!user) {
      return null
    }

    return {
      user: {
        id: user.user_id.toString(),
        name: user.username,
        email: user.email,
        image: `/placeholder.svg?height=32&width=32&text=${user.username.substring(0, 2)}`,
      },
    }
  } catch (error) {
    console.error("認証エラー:", error)
    return null
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
