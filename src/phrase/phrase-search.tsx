import { Input } from "@/components/ui/input";

interface Props {
  searchTerm: string;
  onChange: (searchTerm: string) => void;
}
function PhraseSearch({ searchTerm, onChange }: Props) {
  return (
    <section>
      <label htmlFor="searchPhrases">Search Phrases:</label>
      <Input
        id="searchPhrases"
        name="searchPhrases"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </section>
  );
}

export { PhraseSearch };
