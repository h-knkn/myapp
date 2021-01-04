<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendars';
    protected $fillable = [
        'title',
        'date',
        // 'end_time',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
