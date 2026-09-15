import React from 'react';

export type LanguageMode = 'en' | 'hi' | 'bi';

export interface Leaf {
  id: string;
  title: string;
  titleHi?: string;
  content: string | React.ReactNode;
  contentHi?: string | React.ReactNode;
  tags?: string[];
  isChart?: boolean;
  mermaidCode?: string;
  mermaidCodeHi?: string;
  mermaidCodeBi?: string;
  customVisual?: React.ReactNode;
}

export interface Branch {
  id: string;
  title: string;
  titleHi?: string;
  iconName: string;
  description: string;
  descriptionHi?: string;
  leaves: Leaf[];
}

export interface RootData {
  title: string;
  titleHi?: string;
  subtitle: string;
  subtitleHi?: string;
  branches: Branch[];
}
