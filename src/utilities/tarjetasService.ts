import { getSupabaseClient } from './supabase';

const CDN = (import.meta.env.VITE_CDN_URL ?? '').trim();

export interface Tarjeta {
  id: number | string;
  titulo: string;
  url: string;
  categoria?: string;
  descripcion?: string;
  orden?: number;
}

interface TarjetaRow {
  id?: number | string;
  titulo?: string | null;
  title?: string | null;
  url?: string | null;
  categoria?: string | null;
  descripcion?: string | null;
  orden?: number | null;
}

function buildMediaUrl(path: string): string {
  const trimmed = (path ?? '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (!CDN) return trimmed;
  return `${CDN.replace(/\/$/, '')}/${trimmed.replace(/^\//, '')}`;
}

export async function obtenerTarjetas(): Promise<Tarjeta[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('tarjetas')
    .select('*');

  if (error) {
    console.error('Error cargando tarjetas:', error);
    return [];
  }

  const rows = (data ?? []) as TarjetaRow[];

  return rows.map((t) => ({
    id: t.id ?? Math.random().toString(36),
    titulo: (t.titulo ?? t.title ?? 'Sin titulo').trim(),
    url: buildMediaUrl(t.url ?? ''),
    categoria: t.categoria ?? undefined,
    descripcion: t.descripcion ?? undefined,
    orden: t.orden ?? undefined,
  }));
}
