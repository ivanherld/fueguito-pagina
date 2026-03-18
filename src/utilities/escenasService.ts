import { getSupabaseClient } from './supabase';

const CDN = (import.meta.env.VITE_CDN_URL ?? '').replace(/\/+$/, '');
const ESCENAS_TABLE = import.meta.env.VITE_SUPABASE_ESCENAS_TABLE ?? 'escenas';
const TABLE_CANDIDATES = [
  ESCENAS_TABLE,
  'escenas_supabase',
  'escenas_supabase_2',
  'tarjetas',
].filter((name, index, arr) => arr.indexOf(name) === index);

interface EscenaRow {
  titulo: string;
  url: string | null;
  thumbnail: string | null;
  url_storyboard: string | null;
  filmado: boolean;
  descripcion: string | null;
  orden: number;
  color: string | null;
  fecha_aprox: string | null;
  decorado: string | null;
  comentarios_filmacion: string | null;
}

export interface Escena {
  id: string;
  title: string;
  img: string;
  video?: string;
  storyboard?: string;
  filmado: boolean;
  descripcion?: string;
  orden: number;
  color?: string;
  fechaAprox?: string;
  decorado?: string;
  comentariosFilmacion?: string;
}

function buildMediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;

  const trimmed = path.trim();
  if (!trimmed) return undefined;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const cleanPath = trimmed.replace(/^\/+/, '');
  return CDN ? `${CDN}/${cleanPath}` : `/${cleanPath}`;
}

function fallbackImage(title: string): string {
  const safeTitle = encodeURIComponent(title);
  return `https://placehold.co/640x360/f4f4f4/1f1f1f?text=${safeTitle}`;
}

function deriveThumbnailPath(videoPath?: string | null): string | undefined {
  if (!videoPath) return undefined;

  const trimmed = videoPath.trim();
  if (!trimmed) return undefined;

  return trimmed.replace(/\.[^.]+$/, '.jpg');
}

export async function obtenerEscenas(): Promise<Escena[]> {
  const supabase = getSupabaseClient();

  let selectedTable: string | null = null;
  let rows: EscenaRow[] = [];
  let lastErrorMessage = '';

  for (const tableName of TABLE_CANDIDATES) {
    const { data, error } = await supabase
      .from(tableName)
      .select(
        'titulo, url, thumbnail, url_storyboard, filmado, descripcion, orden, color, fecha_aprox, decorado, comentarios_filmacion',
      )
      .order('orden', { ascending: true });

    if (!error) {
      selectedTable = tableName;
      rows = (data ?? []) as EscenaRow[];
      break;
    }

    const isMissingTable = error.message.includes("Could not find the table");
    lastErrorMessage = error.message;
    if (!isMissingTable) {
      throw new Error(`Error al cargar escenas (${tableName}): ${error.message}`);
    }
  }

  if (!selectedTable) {
    const tried = TABLE_CANDIDATES.join(', ');
    throw new Error(
      `No encontre una tabla valida de escenas. Probe: ${tried}. Configura VITE_SUPABASE_ESCENAS_TABLE con el nombre correcto. Ultimo error: ${lastErrorMessage}`,
    );
  }

  return rows.map((row) => {
    const video = buildMediaUrl(row.url);
    const thumbnail = buildMediaUrl(row.thumbnail ?? deriveThumbnailPath(row.url));
    const storyboard = buildMediaUrl(row.url_storyboard);

    return {
      id: `${row.orden}-${row.titulo}`,
      title: row.titulo,
      img: thumbnail ?? storyboard ?? video ?? fallbackImage(row.titulo),
      video,
      storyboard,
      filmado: Boolean(row.filmado),
      descripcion: row.descripcion ?? undefined,
      orden: row.orden,
      color: row.color ?? undefined,
      fechaAprox: row.fecha_aprox ?? undefined,
      decorado: row.decorado ?? undefined,
      comentariosFilmacion: row.comentarios_filmacion ?? undefined,
    };
  });
}