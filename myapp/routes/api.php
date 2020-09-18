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


Route::group([
    'prefix' => 'auth',
    'middleware' => 'auth:api'
], function () {
    Route::post('logout', 'JWTAuthController@logout');
    Route::post('refresh', 'JWTAuthController@refresh');
    Route::get('me', 'JWTAuthController@me');
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user', 'JWTAuthController@user')->name('api.jwt.user');
});


Route::post('register', 'JWTAuthController@register')->name('api.jwt.register');
Route::post('login', 'JWTAuthController@login');