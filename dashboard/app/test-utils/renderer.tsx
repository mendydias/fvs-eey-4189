import { Provider } from "~/components/ui/provider";
import { render as rtlRender } from "@testing-library/react";
import type React from "react";

export default function render(ui: React.ReactNode) {
  return rtlRender(<>{ui}</>, {
    wrapper: ({ children }: React.PropsWithChildren) => (
      <Provider>{children}</Provider>
    ),
  });
}
