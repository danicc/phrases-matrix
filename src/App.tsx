import { PhraseView } from "./phrase";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <main className="h-[100dvh] flex flex-col items-center">
        <PhraseView />
      </main>
    </>
  );
}

export default App;
