import { timingSafeEqual } from 'crypto';

const AUTH_COOKIE = 'maomen_access';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function safeCompare(value, expected) {
  const valueBuffer = Buffer.from(String(value || ''));
  const expectedBuffer = Buffer.from(String(expected || ''));

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}

function serializeCookie(name, value) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure' : '';
  return [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_MAX_AGE}`,
    secure
  ].filter(Boolean).join('; ');
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const expectedPassword = process.env.SITE_PASSWORD;
  const accessToken = process.env.SITE_ACCESS_TOKEN || expectedPassword;

  if (!expectedPassword || !accessToken) {
    return res.status(500).json({ ok: false, message: 'Password is not configured' });
  }

  if (!safeCompare(req.body?.password, expectedPassword)) {
    return res.status(401).json({ ok: false, message: 'Invalid password' });
  }

  res.setHeader('Set-Cookie', serializeCookie(AUTH_COOKIE, accessToken));
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true });
}
