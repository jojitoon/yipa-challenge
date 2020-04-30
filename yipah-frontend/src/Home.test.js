import React from "react";
import { render, act } from "@testing-library/react";
import Home, { query } from "./Home";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

const mocks = [
  {
    request: {
      query,
    },
    result: {
      data: {
        data: [
          {
            tnx_id: "123",
            description: "game purchase",
            user: "tomi",
            date: "2020-03-22T23:00:00.000Z",
          },
          {
            tnx_id: "12312",
            description: "bou purchase",
            user: "ben",
            date: "2020-03-22T23:00:00.000Z",
          },
          {
            tnx_id: "12123",
            description: "look purchase",
            user: "ola",
            date: "2020-03-22T23:00:00.000Z",
          },
        ],
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

test("renders All transaction", async () => {
  const { getByText, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );

  await wait(100).then(() => {
    const topElement = getByText(/All Transaction/i);
    expect(topElement).toBeInTheDocument();
    expect(container.innerHTML).toMatch(/yipah/i);
    expect(container.lastChild.childNodes.length).toBe(3);
  });
});
