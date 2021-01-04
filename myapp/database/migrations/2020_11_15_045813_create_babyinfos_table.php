<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBabyinfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('babyinfos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->string('name', 10);
            $table->string('birth', 20);
            $table->integer('gender');
            $table->string('average_temperature', 10);
            $table->string('memo', 100);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('babyinfos');
    }
}
