import { Card, CardAction, CardContent } from "@/components/ui/card";
import type { Phrase } from "./types";
import { Button } from "@/components/ui/button";

interface Props {
  phrases: Phrase[];
  onDeletePhrase: (id: string) => void;
}

function PhraseGrid({ phrases, onDeletePhrase }: Props) {
  return (
    <section className="grid grid-cols-[repeat(2,minmax(12rem,1fr))] md:grid-cols-[repeat(3,minmax(12rem,1fr))] lg:grid-cols-[repeat(4,minmax(12rem,1fr))] gap-4">
      {phrases.map((phrase) => (
        <Card key={phrase.id}>
          <CardContent>
            <p>{phrase.message}</p>
            <CardAction className="mt-8">
              <Button
                variant="outline"
                size="icon"
                className="border-destructive"
                onClick={() => onDeletePhrase(phrase.id)}
              >
                🗑️
              </Button>
            </CardAction>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export { PhraseGrid };
