import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  http.get('https://oauth.reddit.com/user/:user/about', ({ params }) => {
    const { user } = params;
    if (user === 'nonexistentuser') {
      return new HttpResponse(null, { status: 404 });
    }
    if (user === 'testuser') {
      return HttpResponse.json({ data: { name: 'testuser' } });
    }
    return HttpResponse.json({ data: { name: user } });
  }),
  http.post('https://www.reddit.com/api/v1/access_token', () => {
    return HttpResponse.json({ access_token: 'test_token' });
  })
);