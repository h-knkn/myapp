<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\FirstMemory;
use App\User;

class FirstMemoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $first_meomories = FirstMemory::all();
        return response()->json(
            $first_meomories
        , 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $first_meomories = firstMemory::create($request->all());
        return response()->json([
            'message' => '登録しました',
            'data' => $first_meomories
        ], 201, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $first_meomories = FirstMemory::find($id);
        if ($first_meomories) {
            return response()->json([
                'message' => 'ok',
                'data' => $first_meomories
            ], 200, [], JSON_UNESCAPED_UNICODE);
        } else {
            return response()->json([
                'message' => 'エラー',
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
    public function update(Request $request, $id)
    {
        $update = [
            'user_id' => $request->user_id,
            'first' => $request->first,
            'date' => $request->date,
            'memo' => $request->memo,
        ];
        $first_meomories = FirstMemory::where('id', $id)->update($update);
        if ($first_meomories) {
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
        $first_meomories = FirstMemory::where('id', $id)->delete();
        if ($first_meomories) {
            return response()->json([
                'message' => 'deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => '削除エラー',
            ], 404);
        }
    }
}
