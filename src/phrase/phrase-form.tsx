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
          <label htmlFor="phrase" className="hidden">
            Phrase:
          </label>
          <Input
            id="phrase"
            name="phrase"
            placeholder="Add new phrase"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </fieldset>
        <Button type="submit">Add</Button>
      </form>
    </section>
  );
}
