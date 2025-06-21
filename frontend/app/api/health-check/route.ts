import { NextResponse, NextRequest } from "next/server"

const BACKEND_URL = "http://localhost:4000/health-checks"

export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url)
      const userId = searchParams.get("userId")
      if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 })
      }
  
      const res = await fetch(`${BACKEND_URL}?userId=${encodeURIComponent(userId)}`)
  
      if (!res.ok) {
        return NextResponse.json({ error: "Backend fetch failed" }, { status: res.status })
      }
  
      const data = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      console.error("API proxy error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
  

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error("Failed to save data to backend")
    }

    const result = await res.json()
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("POST /api/health-check:", error)
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 })
  }
}
