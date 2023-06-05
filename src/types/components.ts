import type { PropsWithChildren, ReactNode } from "react";

export type PWC<T = unknown> = PropsWithChildren<T>;

export type RouteParams = Record<string, string | string[]>;

export type NextErrorProps = {
  reset: () => void;
  error: Error;
};

export type NextComponentProps<P extends RouteParams = RouteParams> = {
  params: P;
};

export type NextPageProps<
  P extends RouteParams = RouteParams,
  S extends RouteParams = RouteParams
> = NextComponentProps<P> & {
  searchParams: S;
};

export type NextLayoutProps<P extends RouteParams = RouteParams> =
  NextComponentProps<P> & {
    children: ReactNode;
  };

export type NextTemplateProps<P extends RouteParams = RouteParams> =
  NextLayoutProps<P>;
