import { useState, useEffect } from 'react';
import type { Artist } from '@/lib/types';

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/artists-data.json');
        if (!response.ok) {
          throw new Error('Falha ao carregar dados dos artistas');
        }
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
}

export function useArtistById(id: number | string | null) {
  const { artists, loading, error } = useArtists();
  const artist = artists.find(a => a.id === Number(id)) || null;

  return { artist, loading, error };
}
