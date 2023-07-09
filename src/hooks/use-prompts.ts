'use client';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url: string, accessToken: string) => fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
}).then((res) => res.json());

export function usePrompts(props: any) {

    const { data, error, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_API_URL}/prompt`, props.accessToken], ([url, token]) => fetcher(url, token))

    return {
        prompts: data,
        isLoading,
        isError: error,
    };
}