import { PhraseForm } from "@/phrase/PhraseForm";
import { PhraseGrid } from "@/phrase/PhraseGrid";
import { usePhrases } from "@/phrase/use-phrases";
import { PhraseSearch } from "@/phrase/PhraseSearch";
import { EmptySearch } from "@/phrase/EmptySearch";

export function PhraseView() {
  const { phrases, addPhrase, removePhrase, searchTerm, setSearchTerm } =
    usePhrases();

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-6xl mb-4 self-center">Phrases</h1>
      <PhraseForm onSubmit={addPhrase} />
      <PhraseSearch searchTerm={searchTerm} onChange={setSearchTerm} />
      {searchTerm && phrases.length === 0 && <EmptySearch />}
      <PhraseGrid phrases={phrases} onDeletePhrase={removePhrase} />
    </div>
  );
}
