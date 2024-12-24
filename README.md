# Next.js for Unified API

Install with `npm i unified-api-nextjs`.

Works like the regular [`unified-api`](https://www.npmjs.com/package/unified-api) package, but with types for Next.js.

In place of `ApiTemplate`, use `NextApiTemplate`. Likewise, use `NextServerApi` in place of `ServerApi`. Create routes
with `createNextRoute`. Requests and responses use Next.js's `NextApiRequest` and this package's `NextResponse` types.

To connect Next.js to the API, create a `pages/api/[...api].ts` (`/app` should also work) file with the following code:

```typescript
import ClientApi from "@/lib/api/ClientApi"; // Your ApiTemplate subclass
import ServerApi from "@/lib/api/ServerApi"; // Your ServerApi subclass
import { NextApiRequest, NextApiResponse } from "next";

const api = new ServerApi(new ClientApi());

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	api.handle(req, res);
}
```

Next.js for Unified API © 2024 by Decatur Robotics is licensed under the MIT license.
