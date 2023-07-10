'use client';
import { ArrowLeftOnRectangleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import PromptCard from './prompt-card';
import { usePrompts } from '@/hooks/use-prompts';
import { signOut } from 'next-auth/react';

const PromptsList = ({ onSelectedPromptChange, accessToken }: any) => {
    const { prompts, isLoading, isError } = usePrompts({ accessToken});

    const [selectedTab, setSelectedTab] = useState('all');

    const handleTabChange = (event: any, value: string) => {
        event.preventDefault();
        setSelectedTab(value);
    };

    const handlePromptClick = (event: any, id: string | null) => {
        event.preventDefault();
        onSelectedPromptChange(event, id);
    };

    const handleLogout = async (event: any) => {
        event.preventDefault();

        await signOut({ redirect: false, callbackUrl: '/' });
    };


    const renderList = () => {
        if (selectedTab === 'all') {
            return prompts.data.map((prompt: any) => {
                return (
                    <PromptCard
                        key={prompt.id}
                        onClick={(e: any) => handlePromptClick(e, prompt.id)}
                        accessToken={accessToken}
                        {...prompt}
                    />
                )
            });
        } else {
            return prompts.data.filter((prompt: any) => prompt.favorite).map((prompt: any) => {
                return (
                    <PromptCard
                        key={prompt.id}
                        onClick={(e: any) => handlePromptClick(e, prompt.id)}
                        accessToken={accessToken}
                        {...prompt}
                    />
                )
            });
        }
    };

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div className="py-0 bg-white w-1/4 dark:bg-gray-900">
            <nav className="flex flex-col sm:flex-row fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 w-1/4 z-10">
                <button
                    className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none w-1/2 ${selectedTab === 'all' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''
                        }`}
                    value={'all'}
                    onClick={(event) => handleTabChange(event, 'all')}
                >
                    All
                </button>
                <button
                    className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none w-1/2 ${selectedTab === 'favorites' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : ''
                        }`}
                    onClick={(event) => handleTabChange(event, 'favorites')}
                >
                    Favorites
                </button>
            </nav>
            <div className="h-screen py-20 overflow-y-auto bg-white dark:bg-gray-900">

                {renderList()}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 w-1/4 z-10 flex justify-center space-10">
                <button
                onClick={(e) => handleLogout(e)}
                className="rounded-md bg-sky-transparent hover:bg-sky-950 font-bold py-2 px-2 w-2/12 h-full my-4 ml-4"
                >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 inline-block mx-auto" />
                </button>
                <button
                    onClick={(e) => handlePromptClick(e, null)}
                    className="rounded-md bg-sky-600 hover:bg-sky-950 py-2 px-2 w-10/12 h-full m-4 ml-2">
                    <PlusIcon className="h-5 w-5 inline-block m-auto mr-2" />
                    <span>New Prompt</span>
                </button>
            </div>
        </div>
    );
}

export default PromptsList;