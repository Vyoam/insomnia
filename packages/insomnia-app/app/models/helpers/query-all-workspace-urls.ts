import { database as db } from '../../common/database';
import { Request, type as RequestType } from '../request';
import { GrpcRequest, type as GrpcRequestType } from '../grpc-request';
import { Workspace } from '../workspace';

export const queryAllWorkspaceUrls = async (
  workspace: Workspace | null,
  reqType: typeof RequestType | typeof GrpcRequestType,
  reqId = 'n/a',
): Promise<Array<string>> => {
  const docs = await db.withDescendants(workspace, reqType);
  const urls = docs
    .filter(
      (d: any) =>
        d.type === reqType &&
        d._id !== reqId && // Not current request
        (d.url || ''), // Only ones with non-empty URLs
    )
    // @ts-expect-error -- TSCONVERSION
    .map((r: Request | GrpcRequest) => (r.url || '').trim());
  return Array.from(new Set(urls));
};
