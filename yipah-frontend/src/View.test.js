import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import View, { query } from "./View";
import { MemoryRouter, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

const mocks = [
  {
    request: {
      query,
      variables: {
        tnx_id: "123",
      },
    },
    result: {
      data: {
        oneData: {
          tnx_id: "123",
          description: "game purchase",
          user: "tomi",
          date: "2020-03-22T23:00:00.000Z",
        },
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

test("renders one transaction", async () => {
  const { getByText, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["view/123"]}>
        <Route path="view/:tnx_id">
          <View />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await wait(100).then(() => {
    const topElement = getByText(/Transaction #123/i);
    const userElement = getByText(/tomi/i);
    const descElement = getByText(/game purchase/i);
    expect(topElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });
});
