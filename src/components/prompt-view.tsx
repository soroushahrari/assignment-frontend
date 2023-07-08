import { usePrompt } from '@/hooks/use-prompt';
import { useState } from 'react';
import useSWR from 'swr';

const PromptView = ({ id }) => {

    const { prompt, isLoading, isError } = usePrompt(id);

    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewtitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    if (isError) {
        return <div>Error loading prompt</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const { title, description, favorite, createdAt, lastModifiedAt } = prompt.data;

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription
            })
        });
        const data = await res.json();
        const { title, description, favorite, createdAt, lastModifiedAt} = data.data;
        setEditMode(false);
    };

    const handleEditmode = (title: string, description: string) => {
        setNewtitle(title);
        setNewDescription(description);
        setEditMode(true);
    };

    const handleCancel = () => {
        setNewtitle(title);
        setNewDescription(description);
        setEditMode(false);
    };

    const handleDelete = async (event: any) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data);
        setEditMode(false);
    };

    

    if (editMode) {
        return (
            <div className="mx-auto self-center w-full max-w-lg">
                <h1 className="text-4xl font-medium">New prompt</h1>
                <p className="mt-3 text-stone-400">Fill the fields below and create a new prompt</p>
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="relative z-0">
                            <input
                                type="text"
                                name="title"
                                required
                                onChange={(e) => setNewDescription(e.target.value)}
                                defaultValue={newTitle}
                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-gray-900 focus:outline-none focus:ring-0" placeholder=" " />
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">Title</label>
                        </div>
                        <div className="relative z-0 col-span-2">
                            <textarea
                                name="newDescription"
                                rows="5"
                                required
                                onChange={(e) => setNewDescription(e.target.value)}
                                defaultValue={description}
                                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-sky-600 focus:outline-none focus:ring-0" placeholder=" ">
                            </textarea>
                            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-600 peer-focus:dark:text-sky-500">Description</label>
                        </div>
                    </div>
                    <button type="submit" className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 px-10 py-2 text-white">Submit</button>
                    <button onClick={handleCancel} className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 px-10 py-2 text-white">Cancel</button>
                    <button onClick={handleDelete} className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 px-10 py-2 text-white">Delete</button>
                </form>
            </div>
        );

    }

    return (
        <div className="mx-auto self-center w-full max-w-lg">
            <h1 className="text-4xl font-medium">{title}</h1>
            <p className="mt-3 text-stone-400">{description}</p>
            <p className="mt-3 text-stone-400">{new Date(createdAt).toLocaleDateString()}</p>
            <p className="mt-3 text-stone-400">{new Date(lastModifiedAt).toLocaleDateString()}</p>
            <button onClick={() => handleEditmode(title, description)} className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 px-10 py-2 text-white">Edit</button>
        </div>
    );
};

export default PromptView;
