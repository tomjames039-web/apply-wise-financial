/**
 * Authentication utilities for Apply Wise Admin Dashboard
 * Uses JWT for session management
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Configuration
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'apply-wise-admin-secret-key-change-in-production'
);
const TOKEN_NAME = 'aw_admin_token';
const TOKEN_EXPIRY = '24h'; // 24 hours

// Admin users - in production, this would be in a database
const ADMIN_USERS: Record<string, { password: string; name: string; role: 'admin' | 'viewer' }> = {
  admin: {
    password: process.env.ADMIN_PASSWORD || 'ApplyWise2024!',
    name: 'Admin User',
    role: 'admin',
  },
  viewer: {
    password: process.env.VIEWER_PASSWORD || 'ViewOnly2024!',
    name: 'View Only',
    role: 'viewer',
  },
};

export interface AdminUser {
  username: string;
  name: string;
  role: 'admin' | 'viewer';
}

export interface AuthResult {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

/**
 * Validate admin credentials
 */
export function validateCredentials(username: string, password: string): AuthResult {
  const user = ADMIN_USERS[username.toLowerCase()];

  if (!user) {
    return { success: false, error: 'Invalid username or password' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Invalid username or password' };
  }

  return {
    success: true,
    user: {
      username: username.toLowerCase(),
      name: user.name,
      role: user.role,
    },
  };
}

/**
 * Create a JWT token for authenticated user
 */
export async function createToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    username: user.username,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      username: payload.username as string,
      name: payload.name as string,
      role: payload.role as 'admin' | 'viewer',
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get current user from cookies (server-side)
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Check if user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

/**
 * Get token cookie options
 */
export function getTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    name: TOKEN_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
  };
}

/**
 * Token cookie name export for client-side
 */
export const AUTH_COOKIE_NAME = TOKEN_NAME;
