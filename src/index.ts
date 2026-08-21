import pidp from "../pidp/src/index";

export interface Env {
  ASSETS: Fetcher;
}

function stripPidpPrefix(request: Request): Request {
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\/pidp(?=\/|$)/, "") || "/";
  return new Request(url.toString(), request);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/pidp" || url.pathname.startsWith("/pidp/")) {
      return pidp.fetch(stripPidpPrefix(request), env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};
