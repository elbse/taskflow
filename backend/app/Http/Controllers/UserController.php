<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $employees = User::role('employee')->get();

        return response()->json($employees);
    }
}
