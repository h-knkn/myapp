<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BabyInfo;
use App\User;
use Illuminate\Support\Facades\Auth;

class BabyInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $babyinfo = BabyInfo::all();
        return response()->json(
            $babyinfo
        , 200);
        
        // $user = User::find($user->id);
        // $babyinfo = BabyInfo::where('user_id', $user_id)->get();
        // $babyinfo = User::find($id)->load('babyinfo');
        // return response()->json([
        //     'message' => 'ok',
        //     'data' => $babyinfo
        // ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $babyinfo = BabyInfo::create($request->all());
        return response()->json(
           $babyinfo
        , 201, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $babyinfo = BabyInfo::find($id);
        if ($babyinfo) {
            return response()->json([
                'message' => 'ok',
                'data' => $babyinfo
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } else {
            return response()->json([
                'message' => 'Info not found',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id)
    {
        $update = [
           
            'user_id' => $request->user_id,
            'name' => $request->name,
            'birth' => $request->birth,
            'gender' => $request->gender,
            'average_temperature' => $request->average_temperature,
            'memo' => $request->memo,
        ];
        $babyinfo = BabyInfo::where('user_id', $user_id)->update($update);
        if ($babyinfo) {
            return response()->json([
                'message' => 'Info updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Info not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
