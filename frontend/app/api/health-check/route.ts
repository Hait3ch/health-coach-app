import { NextResponse } from "next/server"

const BACKEND_URL = "http://localhost:4000/health-checks"

export async function GET() {
  const res = await fetch(BACKEND_URL)
  const data = await res.json()
  return NextResponse.json(data)
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
