'use client';
import PromptCard from '@/components/prompt-card';
import PromptForm from '@/components/prompt-form';
import PromptView from '@/components/prompt-view';
import { usePrompts } from '@/hooks/use-prompts'
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const { prompts, isLoading, isError } = usePrompts();

  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handlePromptClick = (event,id) => {
    event.preventDefault();
    setSelectedPrompt(id);
  };

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <aside className="flex bg-gradient-to-r from-indigo-950 ...">
      <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r w-1/4 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Prompts</h2>
        {prompts.data.map((item) => {
          return (
            <PromptCard
              key={item.id}
              onClick={(e) => handlePromptClick(e, item.id)}
              {...item}
            />
          )
        })}
      </div>
      {selectedPrompt != null
        ? <PromptView id={selectedPrompt} />
        : <PromptForm />
      }
    </aside>
  )
}
