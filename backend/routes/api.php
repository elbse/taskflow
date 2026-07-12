<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'getEmployees']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/my-tasks/{userId}',[TaskController::class, 'myTasks']);
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
Route::get('/tasks',[TaskController::class,'index']);
Route::post('/users', [UserController::class, 'store']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);