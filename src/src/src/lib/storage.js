import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquantes. " +
    "Ajoute-les dans les paramètres Netlify (Site settings > Environment variables)."
  );
}

const supabase = createClient(url || "", anonKey || "");

export const storage = {
  async get(key) {
    const { data, error } = await supabase
      .from("kv_store")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return { key, value: data.value };
  },
  async set(key, value) {
    const { error } = await supabase
      .from("kv_store")
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return { key, value };
  },
  async delete(key) {
    const { error } = await supabase.from("kv_store").delete().eq("key", key);
    if (error) throw error;
    return { key, deleted: true };
  },
};
