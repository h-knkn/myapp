<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FirstMemory extends Model
{
    protected $table = 'first_meomories';
    protected $fillable = [
        'first',
        'user_id',
        'date',
        'memo',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
