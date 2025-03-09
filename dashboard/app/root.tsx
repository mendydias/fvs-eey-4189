import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import type { ErrorResponse } from "react-router";
import { Provider } from "~/components/ui/provider";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

function RouteErrorResponsePage({ status, statusText, data }: ErrorResponse) {
  return (
    <main>
      <h1>Error Response status: {status}</h1>
      <div>
        <p>{statusText}</p>
        <pre>
          <code>{data}</code>
        </pre>
      </div>
    </main>
  );
}

function StandardErrorPage({ stack, message }: Error) {
  return (
    <main>
      <h1>Error: {message}</h1>
      <pre>
        <code>{stack ? stack : "Error stack is unavailable"}</code>
      </pre>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return <RouteErrorResponsePage {...error} />;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    return <StandardErrorPage {...error} />;
  } else {
    return (
      <main>
        <h1>Unknown error</h1>
      </main>
    );
  }
}
