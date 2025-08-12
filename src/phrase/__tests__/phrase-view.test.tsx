import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhraseView } from "@/phrase/PhraseView";

function seedPhrases(messages: string[]) {
  const seeded = messages.map((message, index) => ({
    id: `phrase-${index + 1}`,
    message,
  }));
  localStorage.setItem("phrases:v1", JSON.stringify(seeded));
}

describe("PhraseView", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a new phrase", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PhraseView />);

    // Act
    await user.type(
      screen.getByLabelText(/add a new phrase/i, { selector: "input" }),
      "My Custom Test Phrase!"
    );
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    // Assert
    expect(
      screen.getByLabelText(/add a new phrase/i, { selector: "input" })
    ).toHaveValue("");
    expect(screen.getByText(/my custom test phrase!/i)).toBeInTheDocument();
  });

  it("filters out phrase and show empty message", async () => {
    // Arrange
    const user = userEvent.setup();
    seedPhrases(["To Filter Message.", "Another One"]);
    render(<PhraseView />);
    // Precondition
    expect(screen.getByText(/to filter message./i)).toBeInTheDocument();

    // Act
    await user.type(screen.getByLabelText(/search phrases/i), "123");

    // Assert
    expect(screen.queryByText(/to filter message./i)).not.toBeInTheDocument();
    expect(screen.getByText(/no matches/i)).toBeInTheDocument();
  });

  it("removes a phrase", async () => {
    // Arrange
    seedPhrases(["To Delete Message.", "To Persist Message"]);
    render(<PhraseView />);
    expect(screen.getByText(/to delete message./i)).toBeInTheDocument();
    expect(screen.getByText(/to persist message/i)).toBeInTheDocument();

    // Act
    fireEvent.click(
      screen.getByRole("button", {
        name: /delete phrase: to delete message\./i,
      })
    );

    // Assert
    expect(screen.queryByText(/to delete message./i)).not.toBeInTheDocument();
    expect(screen.getByText(/to persist message/i)).toBeInTheDocument();
  });
});
