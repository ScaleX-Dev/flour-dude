import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import { getPayload, type ServerFunctionArgs, type ServerFunctionClient } from 'payload';
import config from '../../../../../payload.config';

type LayoutProps = {
  children: React.ReactNode;
};

const configPromise = Promise.resolve(config);

export default async function AdminLayout({ children }: LayoutProps) {
  const payload = await getPayload({ config: configPromise });

  const serverFunction: ServerFunctionClient = async (args: ServerFunctionArgs) => {
    'use server';

    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap: payload.importMap ?? {}
    });
  };

  return RootLayout({
    children,
    config: configPromise,
    importMap: payload.importMap ?? {},
    serverFunction
  });
}
