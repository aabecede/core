<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {

    $interchanges = \DB::table('interchange as i')
    ->select('i.idinterchange')
    ->selectRaw('GROUP_CONCAT(lp.idpoint) AS idpoints')
    ->selectRaw('GROUP_CONCAT(lp.idline) AS idlines')
    ->leftJoin('linepoint as lp', 'lp.idinterchange', '=', 'i.idinterchange')
    ->groupBy('i.idinterchange')
    ->orderBy('i.idinterchange')
    ->get()
    ->map(function($item) {
        // Convert numeric values to strings
        $item->idinterchange = (string) $item->idinterchange;
        $item->idpoints = (string) $item->idpoints;
        $item->idlines = (string) $item->idlines;
        return $item;
    });

    $lines = \DB::table('line as l')
    ->select('l.*')
    ->distinct()
    ->selectRaw('(SELECT COUNT(*) FROM linepoint lp WHERE lp.idline = l.idline) AS count')
    ->get()
    ->map(function($q){
        $q->idline     = (string)$q->idline;
        $q->name       = (string)$q->name;
        $q->idlinetype = (string)$q->idlinetype;
        $q->linecolor  = (string)$q->linecolor;
        $q->direction  = (string)$q->direction;
        $q->enabled    = (string)$q->enabled;
        $q->count      = (string)$q->count;
        return $q;
    });

    $linesPoint = [];
    foreach ($lines as $key => $value) {
        $id = $value->idline;
        $currentPoint = DB::table('linepoint as l')
        ->select('p.idpoint', 'p.lat', 'p.lng', 'l.sequence', 'l.stop', 'l.idinterchange', 'ln.linecolor')
        ->selectRaw('? AS idline', [$id])
        ->leftJoin('point as p', 'p.idpoint', '=', 'l.idpoint')
        ->leftJoin('line as ln', 'ln.idline', '=', 'l.idline')
        ->whereIn('l.idline', [$id])
        ->orderBy('l.sequence')
        ->get()
        ->map(function($q){
            $q->idpoint = (string) $q->idpoint;
            $q->lat = (string) $q->lat;
            $q->lng = (string) $q->lng;
            $q->sequence = (string) $q->sequence;
            $q->stop = (string) $q->stop;
            $q->idinterchange = (string) $q->idinterchange;
            $q->linecolor = (string) $q->linecolor;
            $q->idline = (string) $q->idline;
            return $q;
        });


        if($currentPoint->count() > 0)
            $linesPoint[$id] = $currentPoint;
    }


    $data['interchanges'] = $interchanges;
    $data['lines'] = $lines;
    $data['linesPoint'] = $linesPoint;
    // dd($data);
    return view('welcome', $data);
});
