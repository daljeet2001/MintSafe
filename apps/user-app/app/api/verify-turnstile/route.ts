export async function POST(req: Request) {
  const { token } = await req.json();
  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  const body = `secret=${secretKey}&response=${token}`;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  return new Response(JSON.stringify({ success: data.success }), {
    status: data.success ? 200 : 400,
  });
}
