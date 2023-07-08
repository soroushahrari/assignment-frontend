'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrompt(id: string) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, fetcher);
    
    return {
        prompt: data,
        isLoading,
        isError: error,
    };
}