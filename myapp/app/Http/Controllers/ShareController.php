<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Share;

class ShareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shares = Share::where('id',1)->first();
        return response()->json([
            'message' => 'ok',
            'data' => $shares
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shares = Share::create($request->all());
        return response()->json([
            'message' => '保存しました',
            'data' => $shares
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
        $shares = Share::find($id);
        if ($shares) {
            return response()->json([
                'message' => 'ok',
                'data' => $shares
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
    public function update(Request $request, $id)
    {
        $update = [
            'allergies' => $request->allergies,
            'allergies_name' => $request->allergies_name,
            'house_rules' => $request->house_rules,
            'kids_rules' => $request->kids_rules,
            'request_to' => $request->request_to,
            'memo' => $request->memo,
        ];
        $shares = Share::where('id', $id)->update($update);
        if ($shares) {
            return response()->json([
                'message' => '共有事項を変更しました',
            ], 200);
        } else {
            return response()->json([
                'message' => '変更に失敗しました',
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
