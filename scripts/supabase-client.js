// ========================================
// SUPABASE CLIENT
// ========================================

const SUPABASE_URL = 'https://mptvypkvdacwtvsszonw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdHZ5cGt2ZGFjd3R2c3N6b253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNjczOTQsImV4cCI6MjEwMzY0MzM5NH0.Y0qqTxL0dRPMMpytuLhpRzpPLUVgWPr_yz-uZrGwzjg';

let supabaseInstance = null;

async function initSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const module = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  supabaseInstance = module.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase initialized');
  return supabaseInstance;
}

export async function fetchPublishedContent() {
  const client = await initSupabase();
  const { data, error } = await client
    .from('content')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Erreur fetching:', error);
    return [];
  }

  console.log('✅ Found', data.length, 'contenus');
  return data;
}

export async function addContent(content) {
  const client = await initSupabase();
  const { data, error } = await client.from('content').insert([content]).select();

  if (error) {
    console.error('❌ Erreur ajout:', error);
    return null;
  }

  console.log('✅ Contenu ajouté:', data[0]);
  return data[0];
}

export async function deleteContent(id) {
  const client = await initSupabase();
  const { error } = await client.from('content').delete().eq('id', id);

  if (error) {
    console.error('❌ Erreur suppression:', error);
    return false;
  }

  console.log('✅ Contenu supprimé:', id);
  return true;
}