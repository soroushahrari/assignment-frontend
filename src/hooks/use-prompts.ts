'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)

export function usePrompts() {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/prompt`, fetcher);
    
    return {
        prompts: data,
        isLoading,
        isError: error,
    };
}