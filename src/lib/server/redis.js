import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";
import { Redis } from '@upstash/redis';

// Initialize Redis exactly as the guide suggests
export const redis = new Redis({
    url: KV_REST_API_URL || "",
    token: KV_REST_API_TOKEN || ""
});
