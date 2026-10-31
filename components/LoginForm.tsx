'use client';

export function LoginForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get('email') || ''),
      password: String(form.get('password') || ''),
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.setItem('ali-sr-token', result.data.token);
      window.location.href = '/admin';
    } else {
      alert(result.message || 'Login failed');
    }
  }

  return (
    <form className="panel auth-form" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="••••••••" required />
      </label>
      <button type="submit" className="primary-button">Sign in</button>
    </form>
  );
}
