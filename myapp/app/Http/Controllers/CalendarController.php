<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Calendar;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $calendar = Calendar::all();
        return response()->json([
            'message' => 'ok',
            'data' => $calendar
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $calendar = Calendar::create($request->all());
        return response()->json([
            'message' => '予定を追加しました',
            'data' => $calendar
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
        $calendar = Calendar::find($id);
        if ($calendar) {
            return response()->json([
                'message' => 'ok',
                'data' => $calendar
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
            'title' => $request->title,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'description' => $request->description,
        ];
        $calendar = Calendar::where('id', $id)->update($update);
        if ($calendar) {
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
        
        $calendar = Calendar::where('id', $id)->delete();
        if ($calendar) {
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
