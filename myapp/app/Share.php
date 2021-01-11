<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    protected $table = 'shares';
    protected $fillable = [
        'user_id',
        'allergies',
        'allergies_name',
        'house_rules',
        'kids_rules',
        'request_to',
        'memo',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
