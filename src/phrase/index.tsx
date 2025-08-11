import { PhraseForm } from "@/phrase/phrase-form";
import { PhraseGrid } from "@/phrase/phrase-grid";
import { usePhrases } from "@/phrase/use-phrases";
import { PhraseSearch } from "@/phrase/phrase-search";

export function PhraseView() {
  const { phrases, addPhrase, removePhrase, searchTerm, setSearchTerm } =
    usePhrases();

  return (
    <>
      <h1 className="text-4xl mb-4">Phrases Matrix</h1>
      <div className="flex flex-col gap-5">
        <PhraseForm onSubmit={addPhrase} />
        <PhraseSearch searchTerm={searchTerm} onChange={setSearchTerm} />
        <PhraseGrid phrases={phrases} onDeletePhrase={removePhrase} />
      </div>
    </>
  );
}
