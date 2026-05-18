import { NextRequest, NextResponse } from 'next/server';
import {
  validateCredentials,
  createToken,
  verifyToken,
  getTokenCookieOptions,
  AUTH_COOKIE_NAME,
} from '@/lib/auth';

/**
 * POST /api/admin/auth - Login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    const result = validateCredentials(username, password);

    if (!result.success || !result.user) {
      // Add delay to prevent brute force
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(
        { success: false, error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken(result.user);

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        username: result.user.username,
        name: result.user.name,
        role: result.user.role,
      },
    });

    // Set cookie
    const cookieOptions = getTokenCookieOptions();
    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    console.log(`[AUTH] User ${result.user.username} logged in`);

    return response;
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check auth status
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[AUTH] Check error:', error);
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}

/**
 * DELETE /api/admin/auth - Logout
 */
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  // Clear the auth cookie
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Expire immediately
  });

  console.log('[AUTH] User logged out');

  return response;
}
