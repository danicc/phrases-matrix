import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  onSubmit: (newPhraseMessage: string) => void;
}
export function PhraseForm({ onSubmit }: Props) {
  const [message, setMessage] = useState("");

  function handleAddNewPhrase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  }

  return (
    <section>
      <form onSubmit={handleAddNewPhrase} className="flex flex-row gap-2">
        <fieldset>
          <label htmlFor="add-phrase">Add A New Phrase:</label>
          <div className="mt-1 flex flex-row gap-4">
            <Input
              id="add-phrase"
              name="phrase"
              placeholder="Type..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
            />
            <Button type="submit">Add</Button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
