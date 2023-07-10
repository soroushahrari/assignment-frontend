import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { mutate } from "swr";

const PromptForm = (props: any) => {
    const { accessToken } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title, description }),
        }).then((res) => {
            setTitle('');
            setDescription('');
            mutate(`${process.env.NEXT_PUBLIC_API_URL}/prompt`);
            return res.json();
        });
    };

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
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-gray-900 focus:outline-none focus:ring-0" placeholder=" " />
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">Title</label>
                    </div>
                    <div className="relative z-0 col-span-2">
                        <textarea
                            name="description"
                            rows={5}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-sky-600 focus:outline-none focus:ring-0" placeholder=" ">
                        </textarea>
                        <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-600 peer-focus:dark:text-sky-500">Description</label>
                    </div>
                </div>
                <button type="submit" className="mt-5 rounded-md bg-sky-600 hover:bg-sky-950 py-2 px-4 rounded inline-flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-white mr-1" />
                    <span>Submit</span>
                </button>
            </form>
        </div>
    );
};

export default PromptForm;

