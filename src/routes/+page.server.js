import { fail, redirect } from '@sveltejs/kit';
import { redis } from '$lib/server/redis';
import bcrypt from 'bcryptjs';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { username, missing: true });
        }

        // Fetch user from Redis
        const user = await redis.hgetall(`user:${username}`);

        if (!user || Object.keys(user).length === 0) {
            return fail(400, { username, incorrect: true });
        }

        const isValid = await bcrypt.compare(password, String(user.password || ''));
        if (!isValid) {
            return fail(400, { username, incorrect: true });
        }

        // Set session cookie
        cookies.set('session', username, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        throw redirect(303, '/main');
    },
    register: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { username, missing: true });
        }

        // Check if user exists
        const exists = await redis.exists(`user:${username}`);
        if (exists) {
            return fail(400, { username, exists: true });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to Redis
        await redis.hset(`user:${username}`, {
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        });

        return { success: true };
    },
    logout: async ({ cookies }) => {
        cookies.delete('session', { path: '/' });
        throw redirect(303, '/');
    }
};
