import { usePrompt } from '@/hooks/use-prompt';
import { PencilIcon, TrashIcon, } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { CheckCircleIcon, StarIcon as SolidStarIcon, StarIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { mutate } from 'swr';
import Loading from './loading';
import { IPrompt } from '@/interfaces/prompt.interface';

const PromptView = ({ id, accessToken, onSelectedPromptChange }: any) => {

    const { prompt, isLoading, isError } = usePrompt({ id, accessToken });

    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewtitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPromptText, setNewPromptText] = useState('');

    if (isError) {
        return <div>Error loading prompt</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    const promptData: IPrompt = prompt.data;

    const { title, description, favorite, promptText, variable, createdAt, lastModifiedAt } = promptData;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                promptText: newPromptText
            })
        });
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/prompt`);
        await res.json();
        setEditMode(false);
    };

    const handleFavorite = async (event: any, id: any) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                favorite: !favorite
            })
        });
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/prompt`);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, { ...prompt, favorite: !favorite }, false);
        await res.json();
    };


    const handleEditmode = (title: string, description: string) => {
        setNewtitle(title);
        setNewDescription(description);
        setNewPromptText(promptText);
        setEditMode(true);
    };

    const handleCancel = () => {
        setNewtitle(title);
        setNewDescription(description);
        setNewPromptText(promptText);
        setEditMode(false);
    };

    const handleDelete = async (event: any) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/prompt`);
        await res.json();
        onSelectedPromptChange(event, null);
        setEditMode(false);
    };

    if (editMode) {
        return (
            <div className="mx-auto self-center w-full max-w-2xl">
                <h1 className="text-4xl font-medium">Edit prompt</h1>
                <p className="mt-3 text-stone-400">Edit the prompt by changing the fields below</p>
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="relative z-0">
                            <input
                                type="text"
                                name="title"
                                required
                                onChange={(e) => setNewDescription(e.target.value)}
                                defaultValue={newTitle}
                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-sky-600 focus:outline-none focus:ring-0" placeholder=" " />
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">Title</label>
                        </div>
                        <div className="relative z-0 col-span-2">
                            <textarea
                                name="newDescription"
                                rows={2}
                                required
                                onChange={(e) => setNewDescription(e.target.value)}
                                defaultValue={description}
                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-sky-600 focus:outline-none focus:ring-0" placeholder=" ">
                            </textarea>
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-600 peer-focus:dark:text-sky-500">Description</label>
                        </div>
                        <div className="relative z-0 col-span-2">
                            <textarea
                                name="newPromptText"
                                rows={3}
                                required
                                onChange={(e) => setNewPromptText(e.target.value)}
                                defaultValue={promptText}
                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-sky-600 focus:outline-none focus:ring-0" placeholder=" ">
                            </textarea>
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-600 peer-focus:dark:text-sky-500">Text</label>
                        </div>
                    </div>
                    <div className="mx-auto space-x-4">
                        <button type="submit" className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 py-2 px-4 rounded inline-flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-white mr-1" />
                            <span>Submit</span>
                        </button>
                        <button onClick={handleCancel} className="mt-5 rounded-md outline outline-offset-0 outline-1 hover:bg-gray-600 py-2 px-4 rounded inline-flex items-center">
                            <XCircleIcon className="w-5 h-5 text-white mr-1" />
                            <span>Cancel</span>
                        </button>
                    </div>
                </form>

            </div>
        );

    }

    return (
        <div className="mx-auto self-center w-full max-w-2xl">
            <h1 className="text-4xl font-medium">{title}</h1>
            <div className="max-w-prose break-words">
                <p>Description: <span className="mt-3 text-stone-400">{description}</span></p>
            </div>
            <p>Text: <span className="mt-3 text-stone-400">{promptText}</span></p>
            <p>Variables: <span className="mt-3 text-stone-400">{variable.join(' , ')}</span></p>
            <p>Created At: <span className="mt-3 text-stone-400">{new Date(createdAt).toLocaleDateString()}</span></p>
            {
                lastModifiedAt
                    ? <p>Last Modified At: <span className="mt-3 text-stone-400">{new Date(lastModifiedAt).toLocaleDateString()}</span></p>
                    : null
            }
            <div className="mx-auto space-x-4">
                {favorite ? (
                    <button
                        onClick={(e) => handleFavorite(e, id)}
                        className="mt-5 rounded-md bg-yellow-500 border-yellow-500 border hover:bg-transparent hover:border hover:border-stone-200 py-2 px-4 rounded inline-flex items-center"
                    >
                        <StarIcon className="h-5 w-5 inline-block m-auto" />
                    </button>
                ) : (
                    <button
                        onClick={(e) => handleFavorite(e, id)}
                        className="mt-5 rounded-md border-stone-200 border hover:bg-yellow-500 hover:border hover:border-yellow-500 py-2 px-4 rounded inline-flex items-center"
                    >
                        <StarIcon className="h-5 w-5 inline-block m-auto" />
                    </button>
                )}


                <button onClick={() => handleEditmode(title, description)} className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 py-2 px-4 rounded inline-flex items-center">
                    <PencilIcon className="h-5 w-5 inline-block mr-2" />
                    <span>Edit</span>
                </button>
                <button onClick={handleDelete} className="mt-5 rounded-md bg-red-600 hover:bg-red-950 py-2 px-4 rounded inline-flex items-center">
                    <TrashIcon className="h-5 w-5 inline-block mr-2" />
                    <span>Delete</span>
                </button>
            </div>

        </div>
    );
};

export default PromptView;
