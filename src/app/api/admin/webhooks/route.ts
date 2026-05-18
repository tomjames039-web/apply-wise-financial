import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import {
  getAllWebhooks,
  getWebhook,
  addWebhook,
  updateWebhook,
  deleteWebhook,
  testWebhook,
  getWebhookTemplates,
} from '@/lib/webhooks';

// Check authentication
async function checkAuth(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const user = await verifyToken(token);
  return user;
}

/**
 * GET /api/admin/webhooks - List all webhooks or get templates
 */
export async function GET(request: NextRequest) {
  const user = await checkAuth(request);

  // Allow in development without auth
  if (!user && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const templates = searchParams.get('templates');

  // Get webhook templates
  if (templates === 'true') {
    return NextResponse.json({
      success: true,
      data: getWebhookTemplates(),
    });
  }

  // Get single webhook
  if (id) {
    const webhook = getWebhook(id);
    if (!webhook) {
      return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: webhook });
  }

  // Get all webhooks
  return NextResponse.json({
    success: true,
    data: getAllWebhooks(),
  });
}

/**
 * POST /api/admin/webhooks - Create new webhook or test existing
 */
export async function POST(request: NextRequest) {
  const user = await checkAuth(request);

  if (!user && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user has admin role (viewers can't modify)
  if (user && user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { action, ...webhookData } = body;

    // Test webhook
    if (action === 'test') {
      const { id } = webhookData;
      if (!id) {
        return NextResponse.json({ error: 'Webhook ID required' }, { status: 400 });
      }

      const result = await testWebhook(id);
      return NextResponse.json({
        success: result.success,
        data: result,
      });
    }

    // Create webhook
    const { name, url, enabled, events, enquiryTypes, headers, format } = webhookData;

    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid webhook URL' },
        { status: 400 }
      );
    }

    const webhook = addWebhook({
      name,
      url,
      enabled: enabled ?? true,
      events: events || ['enquiry.created'],
      enquiryTypes: enquiryTypes || ['all'],
      headers: headers || {},
      format: format || 'json',
    });

    console.log(`[WEBHOOK] Created: ${webhook.name} (${webhook.id})`);

    return NextResponse.json({
      success: true,
      data: webhook,
    });
  } catch (error) {
    console.error('[WEBHOOK] Create error:', error);
    return NextResponse.json(
      { error: 'Failed to create webhook' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/webhooks - Update webhook
 */
export async function PATCH(request: NextRequest) {
  const user = await checkAuth(request);

  if (!user && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user && user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Webhook ID required' }, { status: 400 });
    }

    // Validate URL if provided
    if (updates.url) {
      try {
        new URL(updates.url);
      } catch {
        return NextResponse.json(
          { error: 'Invalid webhook URL' },
          { status: 400 }
        );
      }
    }

    const webhook = updateWebhook(id, updates);

    if (!webhook) {
      return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
    }

    console.log(`[WEBHOOK] Updated: ${webhook.name} (${webhook.id})`);

    return NextResponse.json({
      success: true,
      data: webhook,
    });
  } catch (error) {
    console.error('[WEBHOOK] Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update webhook' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/webhooks - Delete webhook
 */
export async function DELETE(request: NextRequest) {
  const user = await checkAuth(request);

  if (!user && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user && user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Webhook ID required' }, { status: 400 });
  }

  const success = deleteWebhook(id);

  if (!success) {
    return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
  }

  console.log(`[WEBHOOK] Deleted: ${id}`);

  return NextResponse.json({ success: true });
}
