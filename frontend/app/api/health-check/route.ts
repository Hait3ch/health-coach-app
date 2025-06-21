export async function GET() {
    const res = await fetch("http://localhost:4000/health-checks")
    const data = await res.json()
  
    return Response.json(data)
  }