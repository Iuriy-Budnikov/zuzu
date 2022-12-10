import { error } from '@sveltejs/kit';
import { API_HOST, API_TOKEN } from '$env/static/private';
import { dev } from '$app/environment';

async function proxyHandler({ request, url, params }) {
  try {
    const proxyUrl = new URL(API_HOST);
    proxyUrl.search = url.search + `&access_token=${API_TOKEN}`;
    proxyUrl.pathname = params.path || '/';
    const _request = new Request(request.clone(), { headers: new Headers() });
    const proxyRequest = new Request(proxyUrl, _request);
    if (request.headers.has('accept')) {
      proxyRequest.headers.set('accept', request.headers.get('accept') || '');
    }
    if (request.headers.has('accept-encoding')) {
      proxyRequest.headers.set('accept-encoding', request.headers.get('accept-encoding') || '');
    }
    if (request.headers.has('accept-language')) {
      proxyRequest.headers.set('accept-language', request.headers.get('accept-language') || '');
    }
    if (request.headers.has('cookie')) {
      proxyRequest.headers.set('cookie', request.headers.get('cookie') || '');
    }
    const result = await fetch(proxyRequest);

    const response = new Response(result.body, {
      status: result.status,
      statusText: result.statusText
    });

    return response;
  } catch (e) {
    if (e?.status && e?.body) {
      throw e;
    }
    throw error(500, {
      message: 'Internal Server Error',
      ...(dev
        ? {
            originalError: e
          }
        : undefined)
    });
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;
