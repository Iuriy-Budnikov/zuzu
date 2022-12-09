import { error, json, type RequestEvent } from '@sveltejs/kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_HOST } from '$env/static/private';
import { dev } from '$app/environment';
import apiClient from '$utils/apiClient';

export async function GET({ request }: RequestEvent): Promise<Response> {
  try {
    if (request.headers.get('content-type') !== 'application/json') {
      throw error(400, "Wrong 'Content-Type' header");
    }
    const { data } = await apiClient.get(`https://${APP_HOST}/webscale.json`);
    return json(data);
  } catch (e: any) {
    throw error(500, {
      message: 'Internal Server Error',
      ...(dev
        ? {
          originalError: e,
        }
        : undefined),
    });
  }
}
