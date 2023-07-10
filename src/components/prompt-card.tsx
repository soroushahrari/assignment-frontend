import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { mutate } from 'swr';

const PromptCard = (props: any) => {
    const { id, title, description, createdAt, lastModifiedAt, favorite, onClick, accessToken } = props;

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFavorite = async (event: any) => {
        event.preventDefault();
        console.log(accessToken)
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
        await res.json();
    };


    return (
        <div className="mt-2 space-y-4">
            <button
                onClick={onClick}
                className="flex items-left flex-col w-full space-y-2 px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
            >
                <div className="flex text-left flex-row">
                    {
                        isHovered || favorite
                            ? <SolidStarIcon
                                className="w-5 h-5 text-yellow-500 mr-1"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleFavorite}
                            />
                            : <StarIcon
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="w-5 h-5 mr-1" />
                    }
                    <h1 className="text-sm font-medium text-gray-700 mb-1 capitalize dark:text-white">
                        {title}
                    </h1>
                </div>
                <p className="text-left text-xs text-gray-500 dark:text-gray-400 truncate">
                    {description}
                </p>
            </button>
        </div>
    );
}

export default PromptCard;