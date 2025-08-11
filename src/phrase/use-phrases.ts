import { useCallback, useMemo, useState } from "react";
import type { Phrase } from "./types";

export function usePhrases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const phrasesToDisplay = useMemo(() => {
    const searchQuery = searchTerm.trim().toLowerCase();
    if (!searchQuery) return phrases;
    return phrases.filter((p) => p.message.toLowerCase().includes(searchQuery));
  }, [phrases, searchTerm]);

  const addPhrase = useCallback(function addPhrase(newPhraseMessage: string) {
    const uuid = crypto.randomUUID();
    setPhrases((prev) => [...prev, { id: uuid, message: newPhraseMessage }]);
  }, []);

  const removePhrase = useCallback((id: string) => {
    setPhrases((prev) => prev.filter((p) => p.id !== id));
  }, []);

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
