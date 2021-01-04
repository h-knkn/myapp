<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password'
    ];

    // protected $fillable = ['users'];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'name' => $this->name,
            'email' => $this->email
        ];
    }

    public function babyinfo()
    {
        return $this->hasOne('App\BabyInfo');
    }
    public function calendars()
    {
        return $this->hasMany('App\Calendar');
    }
    public function firstmemorys()
    {
        return $this->hasMany('App\FirstMemory');
    }
    public function shares()
    {
        return $this->hasMany('App\Share');
    }
}
