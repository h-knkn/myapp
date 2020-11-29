<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    protected $table = 'shares';
    protected $fillable = [
        'allergies',
        'house_rules',
        'kids_rules',
        'request',
        'memo',
    ];
}
