<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BabyInfo extends Model
{
    protected $table = 'babyinfos';
    protected $fillable = [
        'name',
        'birth',
        'gender',
        'average_temperature',
        'memo',
    ];
}
