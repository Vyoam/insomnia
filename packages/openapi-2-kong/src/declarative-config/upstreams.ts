import { getName, parseUrl, fillServerVariables } from '../common';
import { DCUpstream } from '../types/declarative-config';
import { OpenApi3Spec } from '../types/openapi3';

export function generateUpstreams(api: OpenApi3Spec, tags: string[]) {
  const servers = api.servers || [];

  if (servers.length === 0) {
    return [];
  }

  // x-kong-upstream-defaults is free format so we do not want type checking.
  // If added, it would tightly couple these objects to Kong, and that would make future maintenance a lot harder.
  const upstreamDefaults = api['x-kong-upstream-defaults'] || {};

  if (typeof upstreamDefaults !== 'object') {
    throw new Error("expected 'x-kong-upstream-defaults' to be an object");
  }

  const upstream: DCUpstream = {
    ...upstreamDefaults,
    name: getName(api),
    targets: [],
    tags,
  };

  for (const server of servers) {
    const serverWithVars = fillServerVariables(server);
    const hostWithPort = parseUrl(serverWithVars).host;

    if (hostWithPort) {
      upstream.targets.push({
        target: hostWithPort,
        tags,
      });
    }
  }

  return [upstream];
}
