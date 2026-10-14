import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2200,
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(words[0]);
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timeoutId: number;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Full word typed, pause before deleting
        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Word cleared, move to next
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  return (
    <span className="inline-flex items-center text-foreground font-mono font-medium tracking-tight">
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-4 w-[2px] bg-accent animate-pulse-subtle"
      />
    </span>
  );
};
