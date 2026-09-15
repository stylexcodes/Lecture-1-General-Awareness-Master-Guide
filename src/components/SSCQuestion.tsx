import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from './Bi';

interface SSCQuestionProps {
  exam: string;
  examHi?: string;
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  correctAnswer: number; // Index of the correct option (0-based)
  explanation?: string;
  explanationHi?: string;
}

export default function SSCQuestion({ 
  exam, 
  examHi,
  question, 
  questionHi,
  options, 
  optionsHi,
  correctAnswer, 
  explanation,
  explanationHi 
}: SSCQuestionProps) {
  const mode = useLanguage();
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(true);

  return (
    <div className="my-5 p-4 sm:p-5 bg-[#0e1726] border border-amber-500/30 rounded-xl shadow-lg relative overflow-hidden group">
      {/* Accent top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 opacity-80" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-amber-400 flex-shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-amber-300">
            {mode === 'hi' && examHi ? examHi : exam}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          SSC PYQ
        </span>
      </div>

      {/* Question rendering */}
      <div className="font-medium text-slate-100 mb-4 leading-relaxed">
        {mode === 'en' && <p className="text-sm sm:text-base">{question}</p>}
        {mode === 'hi' && <p className="text-sm sm:text-base text-[1.02em]">{questionHi || question}</p>}
        {mode === 'bi' && (
          <div className="space-y-1.5">
            <p className="text-slate-100 text-sm sm:text-base">{question}</p>
            {questionHi && (
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{questionHi}</p>
            )}
          </div>
        )}
      </div>

      {/* Options rendering */}
      <div className="flex flex-col gap-2">
        {options.map((opt, idx) => {
          const optHi = optionsHi && optionsHi[idx];
          const isCorrect = idx === correctAnswer;
          const isSelected = userSelection === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setUserSelection(idx)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs sm:text-sm flex items-center justify-between border transition-all ${
                isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-medium shadow-sm'
                  : isSelected
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex-1">
                {mode === 'en' && <span><strong className="text-slate-400 mr-1.5">{String.fromCharCode(65 + idx)}.</strong> {opt}</span>}
                {mode === 'hi' && (
                  <span className="text-[1.02em]">
                    <strong className="text-slate-400 mr-1.5">{String.fromCharCode(65 + idx)}.</strong> {optHi || opt}
                  </span>
                )}
                {mode === 'bi' && (
                  <div className="space-y-0.5">
                    <div><strong className="text-slate-400 mr-1.5">{String.fromCharCode(65 + idx)}.</strong> {opt}</div>
                    {optHi && optHi !== opt && (
                      <div className="text-slate-400 text-[0.93em] font-normal pl-5">{optHi}</div>
                    )}
                  </div>
                )}
              </div>
              {isCorrect && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 ml-2 flex-shrink-0 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-700/50">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Correct
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {(explanation || explanationHi) && showAnswer && (
        <div className="mt-4 pt-3 border-t border-slate-800/90 text-xs sm:text-[13px] text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
          <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <HelpCircle size={14} />
            <span>{mode === 'hi' ? 'व्याख्या / मुख्य बिंदु:' : 'Key SSC Concept / Explanation:'}</span>
          </div>
          {mode === 'en' && <p className="text-slate-300 leading-relaxed">{explanation}</p>}
          {mode === 'hi' && <p className="text-slate-300 leading-relaxed text-[1.02em]">{explanationHi || explanation}</p>}
          {mode === 'bi' && (
            <div className="space-y-1">
              <p className="text-slate-200 leading-relaxed">{explanation}</p>
              {explanationHi && <p className="text-slate-400 text-[0.96em] leading-relaxed">{explanationHi}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
