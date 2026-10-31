import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getJwtSecret, signUserToken, verifyUserToken } from '../lib/auth';

describe('auth helpers', () => {
  it('signs and verifies JWT tokens', () => {
    process.env.JWT_SECRET = 'test-secret';

    const token = signUserToken({
      id: 'user_123',
      email: 'demo@example.com',
      role: 'USER',
      name: 'Demo User',
    });

    const payload = verifyUserToken(token);
    assert.equal(payload.id, 'user_123');
    assert.equal(payload.email, 'demo@example.com');
    assert.equal(payload.role, 'USER');
  });

  it('throws when JWT_SECRET is missing', () => {
    const original = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    assert.throws(() => getJwtSecret(), /JWT_SECRET/);

    process.env.JWT_SECRET = original;
  });
});

