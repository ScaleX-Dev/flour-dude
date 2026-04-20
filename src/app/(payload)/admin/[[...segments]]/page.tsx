import '@payloadcms/next/css';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { getPayload } from 'payload';
import config from '../../../../../payload.config';

const configPromise = Promise.resolve(config);

type PageProps = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = async ({ params, searchParams }: PageProps) => {
  return generatePageMetadata({
    config: configPromise,
    params,
    searchParams
  });
};

export default async function AdminScaffoldPage({ params, searchParams }: PageProps) {
  const payload = await getPayload({ config: configPromise });

  return RootPage({
    config: configPromise,
    importMap: payload.importMap ?? {},
    params,
    searchParams
  });
}
