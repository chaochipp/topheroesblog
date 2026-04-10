import { isSafeRemoteURL } from '@/lib/remoteMedia'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const remoteURL = new URL(request.url).searchParams.get('url')

  if (!remoteURL || !isSafeRemoteURL(remoteURL)) {
    return Response.json({ error: 'Invalid remote image URL.' }, { status: 400 })
  }

  const remoteResponse = await fetch(remoteURL, {
    redirect: 'follow',
  })

  if (!remoteResponse.ok) {
    return Response.json({ error: 'Unable to fetch remote image.' }, { status: 400 })
  }

  const contentType = remoteResponse.headers.get('content-type') ?? ''

  if (!contentType.startsWith('image/')) {
    return Response.json({ error: 'Remote asset is not an image.' }, { status: 400 })
  }

  return new Response(remoteResponse.body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': contentType,
    },
    status: 200,
  })
}
