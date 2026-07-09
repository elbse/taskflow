<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'=>'required|string|max:255',
            'description'=>'nullable|string',
            'status'=>'nullable|in:pending,in_progress,completed',
            'user_ids'=>'required|array',
            'user_ids.*'=>'exists:users,id',
        ]);

        $task = Task::create([
            'title'=> $validated['title'],
            'description'=>$validated['description'] ?? null,
            'status'=>$validated['status'] ?? 'pending',
        ]);

        $task->users()->sync($validated['user_ids']);

        return response()->json($task->load('users'), 201);
    }

    

}
