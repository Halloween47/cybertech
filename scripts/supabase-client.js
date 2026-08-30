// // ========================================
// // SUPABASE CLIENT
// // ========================================

// const SUPABASE_URL = 'https://mptvypkvdacwtvsszonw.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdHZ5cGt2ZGFjd3R2c3N6b253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNjczOTQsImV4cCI6MjEwMzY0MzM5NH0.Y0qqTxL0dRPMMpytuLhpRzpPLUVgWPr_yz-uZrGwzjg';


// ========================================
// SUPABASE CLIENT
// ========================================

const SUPABASE_URL = 'COLLE_TON_PROJECT_URL_ICI';
const SUPABASE_ANON_KEY = 'COLLE_TON_ANON_KEY_ICI';

let _client = null;

function getClient() {
  if (_client) return _client;
  _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client prêt');
  return _client;
}

export function fetchPublishedContent() {
  return getClient().from('content')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
}

export function fetchAllContent() {
  return getClient().from('content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
}

export function addContent(content) {
  return getClient().from('content').insert([content]).select();
}

export function deleteContent(id) {
  return getClient().from('content').delete().eq('id', id);
}