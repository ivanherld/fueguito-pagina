import { supabase } from "./supabase"

const CDN = import.meta.env.VITE_CDN_URL

export async function obtenerTarjetas() {

  const { data, error } = await supabase
    .from("tarjetas")
    .select("*")
    .order("categoria")
    .order("orden")

  if (error) {
    console.error(error)
    return []
  }

  const tarjetasConUrl = data.map(t => ({
    ...t,
    url: `${CDN}/${t.url}`
  }))

  return tarjetasConUrl
}
