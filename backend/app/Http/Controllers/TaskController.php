<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;

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

    public function myTasks($userId)
    {
        $user = User::findOrFail($userId);

        return response()->json($user->tasks()->with('users')->get());
    }

    public function updateStatus($id)
    {
        $task = Task::findOrFail($id);

        $validated = request()->validate([
            'status'=>'required|in:pending,in_progress,completed',
        
        ]);

        $task->status = $validated['status'];
        $task->save();

        return response()->json($task->load('users'));
    }

    public function index()
    {
        return response()->json(Task::with('users')->get());
    }

    

}
