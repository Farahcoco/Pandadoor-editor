import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

function getSafeNextPath(value) {
  if (!value || typeof value !== 'string') {
    return '/';
  }

  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith('/') && !decoded.startsWith('//')) {
      return decoded;
    }
  } catch (error) {
    return '/';
  }

  return '/';
}

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        setError(response.status === 500 ? '访问密码尚未配置' : '密码不正确');
        return;
      }

      await router.replace(getSafeNextPath(router.query.next));
    } catch (requestError) {
      setError('暂时无法验证，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>访问验证 · 猫门智能排版器</title>
      </Head>

      <main className="login-shell">
        <section className="login-panel">
          <div className="brand-mark">🐱</div>
          <h1>猫门智能排版器</h1>
          <p>请输入访问密码</p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              autoFocus
              aria-label="访问密码"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="访问密码"
              autoComplete="current-password"
            />
            {error && <div className="error-text">{error}</div>}
            <button type="submit" disabled={isSubmitting || !password.trim()}>
              {isSubmitting ? '验证中...' : '进入'}
            </button>
          </form>
        </section>
      </main>

      <style jsx>{`
        .login-shell {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, #f7f5f3 0%, #efe9e4 100%);
          color: #4a4039;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
            'Microsoft YaHei', sans-serif;
        }

        .login-panel {
          width: min(100%, 420px);
          padding: 42px 36px 36px;
          border: 1px solid rgba(140, 123, 108, 0.18);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.84);
          box-shadow: 0 18px 50px rgba(90, 70, 52, 0.12);
          text-align: center;
          backdrop-filter: blur(16px);
        }

        .brand-mark {
          margin-bottom: 12px;
          font-size: 42px;
          line-height: 1;
        }

        h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 0;
          color: #7c6d61;
        }

        p {
          margin: 10px 0 26px;
          color: #8a7d73;
          font-size: 14px;
        }

        .login-form {
          display: grid;
          gap: 12px;
        }

        input {
          width: 100%;
          height: 48px;
          box-sizing: border-box;
          border: 1px solid #d7cec7;
          border-radius: 8px;
          background: #fff;
          color: #4a4039;
          font-size: 16px;
          outline: none;
          padding: 0 14px;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        input:focus {
          border-color: #9b8b7d;
          box-shadow: 0 0 0 3px rgba(155, 139, 125, 0.18);
        }

        button {
          height: 48px;
          border: 0;
          border-radius: 999px;
          background: #9b8b7d;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          transition:
            opacity 0.2s,
            transform 0.2s;
        }

        button:not(:disabled):hover {
          transform: translateY(-1px);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }

        .error-text {
          min-height: 20px;
          color: #b24545;
          font-size: 13px;
          text-align: left;
        }

        @media (max-width: 480px) {
          .login-panel {
            padding: 34px 22px 28px;
          }

          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
