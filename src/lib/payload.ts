import { getPayload } from 'payload';
import config from '../../payload.config';

let payloadInstance: ReturnType<typeof getPayload> | null = null;

export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = getPayload({ config });
  }

  return payloadInstance;
}
