'use client';
import useSWR from 'swr';

const fetcher = (url: string, accessToken: string) => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
}).then((res) => res.json());

export function usePrompt(props: any) {
    const {id, accessToken} = props;
    const { data, error, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, accessToken], ([url, token]) => fetcher(url, token))
    
    return {
        prompt: data,
        isLoading,
        isError: error,
    };
}