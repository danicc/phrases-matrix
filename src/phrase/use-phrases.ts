import { useCallback, useMemo, useState } from "react";
import type { Phrase } from "@/phrase/types";
import { useLocalStorageState } from "@/hooks/use-local-storage";

export function usePhrases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [phrases, setPhrases] = useLocalStorageState<Phrase[]>(
    "phrases:v1",
    []
  );

  const phrasesToDisplay = useMemo(() => {
    const searchQuery = searchTerm.trim().toLowerCase();
    if (!searchQuery) return phrases;
    return phrases.filter((p) => p.message.toLowerCase().includes(searchQuery));
  }, [phrases, searchTerm]);

  const addPhrase = useCallback(
    function addPhrase(newPhraseMessage: string) {
      const uuid = crypto.randomUUID();
      setPhrases((prev) => [...prev, { id: uuid, message: newPhraseMessage }]);
    },
    [setPhrases]
  );

  const removePhrase = useCallback(
    (id: string) => {
      setPhrases((prev) => prev.filter((phrase) => phrase.id !== id));
    },
    [setPhrases]
  );

  return useMemo(
    () => ({
      phrases: phrasesToDisplay,
      addPhrase,
      removePhrase,
      searchTerm,
      setSearchTerm,
    }),
    [phrasesToDisplay, addPhrase, removePhrase, searchTerm]
  );
}
