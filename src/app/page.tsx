import SpeechSynthesisComponent from "@/components/SpeechComponent";

export default function Home() {
  return (
    <main className="h-screen w-screen p-20 flex flex-col items-center justify-center gap-5 text-white bg-slate-900 overflow-x-hidden">
      <h1 className="text-xl font-semibold">Speech Synthesis Demo</h1>
      <SpeechSynthesisComponent />
    </main>
  );
}
