import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    // If user is logged in, add their username to locals
    if (session) {
        event.locals.user = session;
    }

    // Protect the /main route
    if (!session && event.url.pathname.startsWith('/main')) {
        throw redirect(303, '/');
    }

    // Redirect logged-in users away from the login page (unless it's a POST request for an action)
    if (session && event.url.pathname === '/' && event.request.method !== 'POST') {
        throw redirect(303, '/main');
    }

    return await resolve(event);
}
