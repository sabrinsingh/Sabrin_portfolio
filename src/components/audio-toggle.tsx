import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundFx } from "@/lib/sound-fx";

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(soundFx.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundFx.toggle();
    setEnabled(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
        enabled
          ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
          : "border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300 hover:border-slate-700"
      }`}
      aria-label={enabled ? "Disable acoustic micro-feedback" : "Enable acoustic micro-feedback"}
      title={enabled ? "Sound FX: On (Click to mute)" : "Sound FX: Off (Click for tactile audio)"}
    >
      {enabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      <span className="text-[10px] hidden sm:inline">{enabled ? "AUDIO ON" : "AUDIO"}</span>
    </button>
  );
}
