<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BabyInfo extends Model
{
    protected $table = 'babyinfos';
    protected $fillable = [
        'user_id',
        'name',
        'birth',
        'gender',
        'average_temperature',
        'memo',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
