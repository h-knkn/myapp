<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('logout', 'JWTAuthController@logout')->name('api.jwt.logout');
    Route::post('refresh', 'JWTAuthController@refresh');
});

Route::get('unauthorized', function() {
    return response()->json([
        'status' => 'error',
        'message' => 'ログインしてください'
    ], 401);
})->name('api.jwt.unauthorized');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user', 'JWTAuthController@user')->name('api.jwt.user');
});


Route::post('register', 'JWTAuthController@register')->name('api.jwt.register');
Route::post('login', 'JWTAuthController@login')->name('api.jwt.login');

// Babyinfo
Route::apiResource('babyinfo', 'BabyInfoController');
// FirstMemory
Route::apiResource('firstmemory', 'FirstMemoryController');
// Share
Route::apiResource('share', 'ShareController');