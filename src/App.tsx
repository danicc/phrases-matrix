import { PhraseView } from "@/phrase";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <Toaster />
      <main className="h-[100dvh] w-full md:max-w-2/3 flex flex-col items-center p-2 mx-auto">
        <PhraseView />
      </main>
    </>
  );
}

export default App;
