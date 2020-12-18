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
}
