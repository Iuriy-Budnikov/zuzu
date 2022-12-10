import { error } from '@sveltejs/kit';
import { API_IMG_CDN } from '$env/static/private';
import { dev } from '$app/environment';

async function proxyHandler({ request, url, params }) {
  try {
    const proxyUrl = new URL(API_IMG_CDN);
    proxyUrl.search = url.search;
    proxyUrl.pathname = params.path || '/';
    const _request = new Request(request.clone(), { headers: new Headers() });
    const proxyRequest = new Request(proxyUrl, _request);
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
