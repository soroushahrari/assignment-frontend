'use client';
import PromptForm from '@/components/prompt-form';
import PromptView from '@/components/prompt-view';
import PromptsList from '@/components/prompts-list';
import { useState } from 'react';

export default function Home() {

  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const onSelectedPromptChange = (event: any, id: any) => {
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
