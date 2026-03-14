import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';

// Initialize Redis with dynamic env variables to support prefixed keys
export const redis = new Redis({
    url: env.walmart_KV_REST_API_URL || env.KV_REST_API_URL || "",
    token: env.walmart_KV_REST_API_TOKEN || env.KV_REST_API_TOKEN || ""
});
