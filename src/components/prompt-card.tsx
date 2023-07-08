import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const PromptCard = (props) => {
    const { id, title, description, createdAt, lastModifiedAt, favorite, onClick } = props;

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFavorite = async (event) => {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                favorite: !favorite
            })
        });
        const data = await res.json();
        console.log(data);
    };


    return (

        <div className="mt-2 space-y-4">
            <button            
                onClick={onClick}
                className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <div className="text-left rtl:text-right max-w-xs">
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
                    <h1 className="text-sm font-medium text-gray-700 mb-4 capitalize dark:text-white">{title}</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </button>
        </div>
    );
}

export default PromptCard;