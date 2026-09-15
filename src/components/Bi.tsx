import React, { createContext, useContext } from 'react';
import { LanguageMode } from '../types';

export const LanguageContext = createContext<LanguageMode>('en');

export const useLanguage = () => useContext(LanguageContext);

export interface BiProps {
  en: React.ReactNode;
  hi?: React.ReactNode;
  className?: string;
  enClassName?: string;
  hiClassName?: string;
}

/**
 * Inline or block bilingual text element.
 * Mode 'en': renders English only
 * Mode 'hi': renders Hindi only (or English fallback if Hindi missing)
 * Mode 'bi': renders English on line 1, Hindi on line 2
 */
export const Bi: React.FC<BiProps> = ({ 
  en, 
  hi, 
  className = '', 
  enClassName = '', 
  hiClassName = '' 
}) => {
  const mode = useLanguage();

  if (mode === 'en' || !hi) {
    return <span className={className}>{en}</span>;
  }

  if (mode === 'hi') {
    return <span className={`text-[1.02em] leading-relaxed ${className} ${hiClassName}`}>{hi}</span>;
  }

  // 'bi' mode: English on line 1, Hindi immediately on line 2
  return (
    <span className={`inline-flex flex-col gap-0.5 ${className}`}>
      <span className={`text-slate-100 ${enClassName}`}>{en}</span>
      <span className={`text-slate-400 opacity-90 text-[0.98em] leading-relaxed ${hiClassName}`}>
        {hi}
      </span>
    </span>
  );
};

/**
 * List item bilingual element formatted specifically for bullet points:
 * English bullet
 * Hindi translation directly below it
 */
export const BiLi: React.FC<BiProps> = ({ 
  en, 
  hi, 
  className = '', 
  enClassName = '', 
  hiClassName = '' 
}) => {
  const mode = useLanguage();

  if (mode === 'en' || !hi) {
    return <li className={`text-slate-200 ${className}`}>{en}</li>;
  }

  if (mode === 'hi') {
    return (
      <li className={`text-slate-200 text-[1.02em] leading-relaxed ${className}`}>
        <span className={hiClassName}>{hi}</span>
      </li>
    );
  }

  // 'bi' mode:
  // 1934: MN Roy first demanded a constituent assembly.
  // 1934: एम.एन. रॉय ने पहली बार संविधान सभा की मांग की।
  return (
    <li className={`space-y-0.5 my-1.5 ${className}`}>
      <div className={`text-slate-100 font-medium ${enClassName}`}>{en}</div>
      <div className={`text-slate-400 text-[0.98em] leading-relaxed ${hiClassName}`}>
        {hi}
      </div>
    </li>
  );
};

/**
 * Bilingual Box for callouts, notes, formulas, or info blocks
 */
export const BiBox: React.FC<{
  en: React.ReactNode;
  hi?: React.ReactNode;
  className?: string;
  enClassName?: string;
  hiClassName?: string;
}> = ({ en, hi, className = '', enClassName = '', hiClassName = '' }) => {
  const mode = useLanguage();

  if (mode === 'en' || !hi) {
    return <div className={`text-slate-100 ${className}`}>{en}</div>;
  }

  if (mode === 'hi') {
    return <div className={`text-slate-200 text-[1.02em] leading-relaxed ${className} ${hiClassName}`}>{hi}</div>;
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className={`text-slate-100 ${enClassName}`}>{en}</div>
      <div className={`pt-2 border-t border-slate-700/80 text-slate-400 text-[0.98em] leading-relaxed ${hiClassName}`}>
        {hi}
      </div>
    </div>
  );
};
