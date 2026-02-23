import { fail, redirect } from '@sveltejs/kit';
import { redis } from '$lib/server/redis';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const adminSession = cookies.get('admin_session');

    if (adminSession !== 'true') {
        return { authorized: false };
    }

    // Get all user keys
    const keys = await redis.keys('user:*');

    // Fetch all user data
    const userPromises = keys.map(key => redis.hgetall(key));
    const rawUsers = await Promise.all(userPromises);

    // Filter out any null results and sort by last login
    const users = (rawUsers || [])
        .filter((user) => user !== null)
        .sort((a, b) => {
            const timeA = a && a.lastLogin ? new Date(String(a.lastLogin)).getTime() : 0;
            const timeB = b && b.lastLogin ? new Date(String(b.lastLogin)).getTime() : 0;
            return timeB - timeA;
        });

    return {
        authorized: true,
        users: users.map(u => ({
            username: String(u?.username || ''),
            email: String(u?.email || ''),
            createdAt: String(u?.createdAt || ''),
            lastLogin: String(u?.lastLogin || '')
        }))
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString().toLowerCase();
        const password = data.get('password')?.toString();

        if (username === 'krxn0s' && password === 'Thc9001!') {
            cookies.set('admin_session', 'true', {
                path: '/admin',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 12 // 12 hours
            });
            throw redirect(303, '/admin');
        }

        return fail(401, { incorrect: true });
    },
    logout: async ({ cookies }) => {
        cookies.delete('admin_session', { path: '/admin' });
        throw redirect(303, '/main');
    }
};
