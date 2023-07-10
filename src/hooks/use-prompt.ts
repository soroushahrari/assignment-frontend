'use client';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string, accessToken: string) => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
}).then((res) => res.json());

export function usePrompt(props: any) {
    const MAX_RETRY = 3;
    const [retryCount, setRetryCount] = useState(0);
    const { id, accessToken } = props;
    const { data, error, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, accessToken], ([url, token]) => fetcher(url, token))

    if (error && retryCount < MAX_RETRY) {
        mutate([`${process.env.NEXT_PUBLIC_API_URL}/prompt/${id}`, accessToken]);
        setRetryCount(retryCount + 1);
    }

    return {
        prompt: data,
        isLoading,
        isError: error,
    };
}