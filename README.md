# day-heatmap.js

![Day-heatmap exemple](http://divers.corentin-thomasset.fr/public/images/day-heatmap-1.PNG)

`day-heatmap.js` is a simple library to create responsive github like heatmap to display data on a scale of a day.

Try it: [live demo](http://divers.corentin-thomasset.fr/day-heatmap/).

## Setup
It's composed of a javascript and a css file.

**Note:** This library requires jQuery to work.

### Method 1: Direct files

You can download the source files (under `src/`), and add them to your project (the javascript must be loaded after jQuery).

```html
    <link rel="stylesheet" href="css/day-heatmap.min.css">
    <script src="js/day-heatmap.min.js"></script>
```

### Method 2: CDN

The most easier thing is to use github as a CDN, so you don't have to donwload the files. Just add that to your project:

```html
    <link rel="stylesheet" href="https://cdn.rawgit.com/CorentinTh/day-heatmap/master/src/day-heatmap.min.js">
    <script src="https://cdn.rawgit.com/CorentinTh/day-heatmap/master/src/day-heatmap.min.js"></script>
```

## Make it works

To make it works you just need one line of javascript:

```html
<script>
    DayHeatmap(element, options).data(dataset).draw();    
</script>
```
Where :
* `element` is a string representing the id of the div where you want it to be displayed.
* `options` (optional) is an object to customize a the heatmap.
    * `halfDays` a boolean, to display only a day in two
    * `halfHours` a boolean, to display only a hour in two
    * `colors` a 5 row array contening your custom gradient (index 0: the lighter, and index 4 the darker).
* `data` is an object array with the following format :
```javascript
var data = [
    {timestamp:1511401167678, value:5},
    {timestamp:1511401177542, value:2},
    // ...
]
```

### Exemple

Here is a working exemple with all the functionnalities:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Heatmap</title>
    
    <link rel="stylesheet" href="https://cdn.rawgit.com/CorentinTh/day-heatmap/master/src/day-heatmap.min.js">

    <!-- Just for styling purpose -->
    <style>
        .container{
            width: 50%;
            margin:200px 25%;
        }
    </style>
</head>
<body>

<div class="container">
   <div id="day-heatmap"></div>
</div>

<!-- First jQuery -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdn.rawgit.com/CorentinTh/day-heatmap/master/src/day-heatmap.min.js"></script>
<script>
    var dummyData = [{timestamp: 738221588, value: 34}, {timestamp: 455091188, value: 85}, {timestamp: 1006992511, value: 61}, {timestamp: 374216407, value: 96}, {timestamp: 557060294, value: 39}, {timestamp: 1088268560, value: 45}, {timestamp: 790274681, value: 95}, {timestamp: 924184922, value: 46}, {timestamp: 16227933, value: 47}];

    DayHeatmap("day-heatmap",
        {
            halfDays: true,
            halfHours: true,
            colors: [
                "#7ae0cc",
                "#3fc5ab",
                "#379e8a",
                "#28675b",
                "#294C58"
            ]
        }).data(dummyData).draw();
</script>
</body>
</html>
```

## Todo
* Allow other type of data input.
* Display tooltip with the value on hover of a square.
