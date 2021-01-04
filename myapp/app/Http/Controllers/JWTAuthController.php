<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Support\Facades\Auth;


class JWTAuthController extends Controller
{

    public function index()
    {
        $user = User::all();
        return response()->json(
            $user
        , 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function show($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            return response()->json(
                 $user
            , 200, [], JSON_UNESCAPED_UNICODE);
        } else {
            return response()->json([
                'message' => 'ok',
            ], 404);
        }
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|max:255|confirmed',
            'password_confirmation' => 'required|string|max:255',
        ]);

        
        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messages' => $validator->messages()
            ], 200);
        }

        $user = new User;
        $user->fill($request->all());
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 200);

        // return response()->json(compact('user'),200);

    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => '名前、パスワードが間違っています'], 401);
        }

        return $this->respondWithToken($token);
    }
    

    public function user() {
        return response()->json(Auth::guard('api')->user());
    }

    
       /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }

    public function logout() {
        Auth::guard('api')->logout();
    
        return response()->json([
            'status' => 'success',
            'message' => 'logout'
        ], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}




