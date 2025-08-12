import { useDeferredValue, useCallback, useMemo, useState } from "react";
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
  const deferredSearch = useDeferredValue(searchTerm);

  const phrasesToDisplay = useMemo(() => {
    const searchQuery = deferredSearch.trim().toLowerCase();
    if (!searchQuery) return phrases;
    return phrases.filter((p) => p.message.toLowerCase().includes(searchQuery));
  }, [phrases, deferredSearch]);

  const addPhrase = useCallback(
    function addPhrase(newPhraseMessage: string) {
      const message = newPhraseMessage.trim();
      if (
        phrases.some((p) => p.message.toLowerCase() === message.toLowerCase())
      ) {
        toast.error("Duplicate phrase");
        return;
      }

      setPhrases((prev) => {
        return [...prev, { id: crypto.randomUUID(), message }];
      });
      toast.success("Added New Phrase");
    },
    [phrases, setPhrases]
  );

  const removePhrase = useCallback(
    (id: string) => {
      setPhrases((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted Phrase", {
        action: {
          label: "Undo",
          onClick: () => setPhrases(phrases),
        },
      });
    },
    [phrases, setPhrases]
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
