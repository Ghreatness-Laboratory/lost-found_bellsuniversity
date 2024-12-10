import React from "react";
import { render, waitFor } from "@testing-library/react";
import useFetch from "../hooks/useFetch";

global.fetch = jest.fn();

type MockData = { message: string };

const HookWrapper = ({ url }: { url: string }) => {
  const { data, loading, error } = useFetch<MockData>(url);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
};

describe("useFetch Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { message: "Success" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { getByText } = render(<HookWrapper url="/api/success" />);

    expect(getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() => expect(getByText(/Success/)).toBeInTheDocument());
  });

  it("handles server error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { getByText } = render(<HookWrapper url="/api/error" />);

    expect(getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() =>
      expect(getByText(/Error: Failed to fetch data. Please try again./)).toBeInTheDocument()
    );
  });

  it("handles network error", async () => {
    const networkError = new Error("Network Error");
    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    const { getByText } = render(<HookWrapper url="/api/network-error" />);

    expect(getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() => expect(getByText(/Error: Network Error/)).toBeInTheDocument());
  });
});
