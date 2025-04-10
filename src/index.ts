import { NextApiRequest, NextApiResponse } from "next";
import OmitCallSignature from "omit-call-signature";
import * as UnifiedApi from "unified-api";

export abstract class NextApiTemplate<
	TDependencies,
> extends UnifiedApi.ApiTemplate<TDependencies, NextApiRequest> {}

export class NextResponse<TSend> implements UnifiedApi.ApiResponse<TSend> {
	constructor(public innerRes: NextApiResponse) {}

	send(data: TSend | UnifiedApi.ApiErrors.ErrorType) {
		this.innerRes.send(data);
		return this;
	}

	status(code: number) {
		this.innerRes.status(code);
		return this;
	}

	error(code: number, message: string) {
		this.innerRes.status(code).send({ error: message });
		return this;
	}
}

export function createNextRoute<
	TArgs extends Array<any>,
	TReturn,
	TDependencies,
	TFetchedDuringAuth,
	TLocalDependencies extends object = {},
>(
	server: Omit<
		OmitCallSignature<
			UnifiedApi.Route<
				TArgs,
				TReturn,
				TDependencies,
				TFetchedDuringAuth,
				NextApiRequest,
				NextResponse<TReturn>,
				TLocalDependencies
			>
		>,
		"subUrl"
	>,
	clientHandler?: (...args: any) => Promise<any>,
): UnifiedApi.Route<
	TArgs,
	TReturn,
	TDependencies,
	TFetchedDuringAuth,
	NextApiRequest,
	NextResponse<TReturn>,
	TLocalDependencies
> {
	return UnifiedApi.createRoute(server as any, clientHandler);
}

export abstract class NextServerApi<TDependencies> extends UnifiedApi.ServerApi<
	TDependencies,
	NextApiRequest,
	NextResponse<unknown>
> {
	protected parseRawResponse(rawRes: any): NextResponse<unknown> {
		return new NextResponse(rawRes);
	}
}
