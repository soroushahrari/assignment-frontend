'use client';
import PromptForm from '@/components/prompt-form';
import PromptView from '@/components/prompt-view';
import PromptsList from '@/components/prompts-list';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Home(props: any) {

  const [selectedPrompt, setSelectedPrompt] = useState(null);


  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to login page
      redirect('/login');
    },
  });


  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    redirect('/login');
  }

  const onSelectedPromptChange = (event: any, id: any) => {
    event.preventDefault();
    setSelectedPrompt(id);
  };

  return (
    <aside className="flex bg-gradient-to-r from-indigo-950 ...">
      <PromptsList onSelectedPromptChange={onSelectedPromptChange} accessToken={session.accessToken} />
      {selectedPrompt != null
        ? <PromptView id={selectedPrompt} accessToken={session.accessToken} />
        : <PromptForm accessToken={session.accessToken}/>
      }
    </aside>
  )
}
