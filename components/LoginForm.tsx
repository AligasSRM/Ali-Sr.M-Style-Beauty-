export function LoginForm() {
  return (
    <form className="panel auth-form">
      <h3>Login</h3>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="••••••••" />
      </label>
      <button type="submit" className="primary-button">Sign in</button>
    </form>
  );
}
