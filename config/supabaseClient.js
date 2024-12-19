import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eypdhwtsjitmkszriskv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cGRod3Rzaml0bWtzenJpc2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDY0NjksImV4cCI6MjA1MDEyMjQ2OX0.MbxwiqCAJhMwxjOzcl5tL7d9Xy9YRnFTfvBGrHJ_uz4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase