const AUTH_COOKIE = 'maomen_access';

export default function handler(req, res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
  );
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true });
}
