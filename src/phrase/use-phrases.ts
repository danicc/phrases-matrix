import { useCallback, useMemo, useState } from "react";
import type { Phrase } from "@/phrase/types";
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { PHRASES_STORAGE_KEY } from "@/phrase/constants";
import { toast } from "sonner";

export function usePhrases() {
  const [phrases, setPhrases] = useLocalStorageState<Phrase[]>(
    PHRASES_STORAGE_KEY,
    []
  );

  const [searchTerm, setSearchTerm] = useState("");

  const phrasesToDisplay = useMemo(() => {
    const searchQuery = searchTerm.trim().toLowerCase();
    if (!searchQuery) return phrases;
    return phrases.filter((p) => p.message.toLowerCase().includes(searchQuery));
  }, [phrases, searchTerm]);

  const addPhrase = useCallback(
    function addPhrase(newPhraseMessage: string) {
      const uuid = crypto.randomUUID();
      setPhrases((prev) => [...prev, { id: uuid, message: newPhraseMessage }]);
      toast.success("Added New Phrase", { className: "bg-green-500" });
    },
    [setPhrases]
  );

  const removePhrase = useCallback(
    (id: string) => {
      setPhrases((prev) => prev.filter((phrase) => phrase.id !== id));
      toast.success("Deleted Phrase");
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
