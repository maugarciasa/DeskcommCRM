import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { BarraDeProgressoNavegacao } from "@/components/shell/BarraDeProgressoNavegacao";

let mockPathname = "/app/inbox";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(),
}));

describe("BarraDeProgressoNavegacao", () => {
  afterEach(() => {
    cleanup();
    mockPathname = "/app/inbox";
  });

  it("permanece oculta na montagem inicial", () => {
    const { container } = render(<BarraDeProgressoNavegacao />);
    expect(container.firstChild).toBeNull();
  });

  it("ativa imediatamente no clique em um link para outra rota interna", () => {
    const { container } = render(
      <div>
        <BarraDeProgressoNavegacao />
        <a href="/app/contacts">Contatos</a>
      </div>,
    );

    const link = screen.getByText("Contatos");
    fireEvent.click(link);

    const barra = container.querySelector("[aria-hidden='true']");
    expect(barra).not.toBeNull();
  });

  it("não ativa ao clicar em link para a mesma rota atual", () => {
    const { container } = render(
      <div>
        <BarraDeProgressoNavegacao />
        <a href="/app/inbox">Inbox Atual</a>
      </div>,
    );

    const link = screen.getByText("Inbox Atual");
    fireEvent.click(link);

    const barra = container.querySelector("[aria-hidden='true']");
    expect(barra).toBeNull();
  });
});
