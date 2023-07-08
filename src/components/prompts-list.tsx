'use client';
import { PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import PromptCard from './prompt-card';
import { usePrompts } from '@/hooks/use-prompts';

const PromptsList = ({ onSelectedPromptChange }) => {
    const { prompts, isLoading, isError } = usePrompts();

    const [selectedTab, setSelectedTab] = useState('all');

    const handleTabChange = (event, value) => {
        event.preventDefault();
        setSelectedTab(value);
    };

    const handlePromptClick = (event, id) => {
        event.preventDefault();
        onSelectedPromptChange(event, id);
    };


    const renderList = () => {
        if (selectedTab === 'all') {
            return prompts.data.map((prompt) => {
                return (
                    <PromptCard
                        key={prompt.id}
                        onClick={(e) => handlePromptClick(e, prompt.id)}
                        {...prompt}
                    />
                )
            });
        } else {
            return prompts.data.filter((prompt) => prompt.favorite).map((prompt) => {
                return (
                    <PromptCard
                        key={prompt.id}
                        onClick={(e) => handlePromptClick(e, prompt.id)}
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
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 w-1/4 z-10 flex justify-center">
                <button
                    onClick={(e) => handlePromptClick(e, null)}
                    className="rounded-md bg-sky-600 hover:bg-sky-950 font-bold py-2 px-4 w-full h-full m-4">
                    <PlusIcon className="h-5 w-5 inline-block mr-2" />
                    <span>New Prompt</span>
                </button>
            </div>
        </div>
    );
}

export default PromptsList;