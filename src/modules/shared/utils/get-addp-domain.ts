import process from 'process';

export const getAppDomain = () => {
  let domain;
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_VERCEL_URL
  ) {
    domain = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (typeof window !== 'undefined') {
    domain = window.location.origin;
  } else {
    domain = 'http://localhost:3000';
  }
  return domain;
};
