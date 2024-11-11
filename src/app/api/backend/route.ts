// src/app/api/backend/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://dqepbxuxrpqhcrjrrahy.supabase.co';
const supabaseKey = process.env.SUPABASE_API_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Handle GET requests - Fetch all tasks
 */
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase.from('list').select('*');
    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

/**
 * Handle POST requests - Add a new task
 */
export async function POST(request: NextRequest) {
  try {
    const { contents } = await request.json();

    // Validate the input
    if (!contents || typeof contents !== 'string') {
      return NextResponse.json({ error: 'Invalid task contents' }, { status: 400 });
    }

    const { data, error } = await supabase.from('list').insert([{ contents }]).select('*');
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json({ error: 'Error adding task' }, { status: 500 });
  }
}

/**
 * Handle DELETE requests - Remove a task
 */
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // Validate the input
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const { error } = await supabase.from('list').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}
