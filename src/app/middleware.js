import { getSession } from 'next-auth/react';

export async function middleware(req) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return NextResponse.next();
}
