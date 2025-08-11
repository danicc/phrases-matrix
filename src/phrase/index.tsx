import { PhraseForm } from "@/phrase/phrase-form";
import { PhraseGrid } from "@/phrase/phrase-grid";
import { usePhrases } from "@/phrase/use-phrases";
import { PhraseSearch } from "@/phrase/phrase-search";

export function PhraseView() {
  const { phrases, addPhrase, removePhrase, searchTerm, setSearchTerm } =
    usePhrases();

  return (
    <>
      <h1 className="text-6xl mb-4">Phrases</h1>
      <div className="flex flex-col gap-5 h-full w-full md:max-w-2/3">
        <PhraseForm onSubmit={addPhrase} />
        <PhraseSearch searchTerm={searchTerm} onChange={setSearchTerm} />
        {searchTerm && phrases.length === 0 && (
          <section className="flex justify-center  h-full p-4">
            <h3 className="text-4xl text-center">
              No Matches.
              <br />
              Try searching something else!
            </h3>
          </section>
        )}
        <PhraseGrid phrases={phrases} onDeletePhrase={removePhrase} />
      </div>
    </>
  );
}
