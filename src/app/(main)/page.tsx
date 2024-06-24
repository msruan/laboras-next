import { MainPosts } from '@/components/MainPosts';
import { auth } from '@/lib/auth';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laboras',
  description: 'The worst social network :)',
}
export default async function HomePage() {
  return (
   <MainPosts/>
  );
}
