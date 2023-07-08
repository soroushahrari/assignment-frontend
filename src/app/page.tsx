'use client';
import PromptCard from '@/components/prompt-card';
import PromptForm from '@/components/prompt-form';
import PromptView from '@/components/prompt-view';
import PromptsList from '@/components/prompts-list';
import { usePrompts } from '@/hooks/use-prompts'
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {

  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const onSelectedPromptChange = (event, id) => {
    event.preventDefault();
    setSelectedPrompt(id);
  };

  return (
    <aside className="flex bg-gradient-to-r from-indigo-950 ...">
      <PromptsList onSelectedPromptChange={onSelectedPromptChange} />
      {selectedPrompt != null
        ? <PromptView id={selectedPrompt} />
        : <PromptForm />
      }
    </aside>
  )
}
