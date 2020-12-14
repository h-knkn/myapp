<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendars';
    protected $fillable = [
        'title',
        'start_time',
        'end_time',
        'description',
    ];
}
