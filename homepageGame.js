$(document).ready(main);

var canvas;
var stage;

//Replace the cursor
$("*").each(function() {
    var cur = $(this);
    if(cur) {
       cur.css("cursor", "images/logo.png");
    }
});

function main() {
    canvas = document.getElementById("MyCanvas");
    //canvas = document.createElement("canvas");
    
    width = window.innerWidth;
    height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2D");
    
    document.body.appendChild(canvas);
    //Create a stage by getting a reference to the canvas
    stage = new createjs.Stage(canvas);
    
    // An array to hold the created canvas_squares
    var canvas_squares = [];
    // The number of new canvas_squares_clockwise created everytime createSquare() is called
    var num_new_canvas_squares = 5;
    var shape_lift_speed = 3;
    var create_shapes = true;
    
    var mouse_x = 0;
    var mouse_y = 0;
    var mouse_left_window = false;
    
    var x_offset = 200;
    // The width at the bottom of the screen to create the squares
    var creation_width = canvas.width + x_offset;
    
    // Keep track of the mouse coordinates
    stage.addEventListener("stagemousemove", trackMouse);
    function trackMouse(event) {
        mouse_x = event.stageX;
        mouse_y = event.stageY;
    }
    
    stage.addEventListener("mouseleave", mouseLeave);
    function mouseLeave(event) {
        mouse_x = -5000;
        mouse_y = -5000;
    }
    
    // Detect when the mouse leaves or enters the page
    jQuery(document).mouseleave(function(){ mouse_left_window = true })
    jQuery(document).mouseenter(function(){ mouse_left_window = false });

    run();
    
    function run() {
        var loop = function() {
            update();
            render();
            window.requestAnimationFrame(loop, canvas);
        }
        window.requestAnimationFrame(loop, canvas);
    }
    
    function update() {
        // Get a random number to dictate snowfall
        var snowfall_rate = Math.floor(Math.random() * 10);
        if (create_shapes == true && snowfall_rate == 1) {
            createSquare();   
        }
        updateShapes(canvas_squares);
        // Re-adjust the size of the stage
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
    }
    
    function render() {
        stage.update();
    }
    
    function createSquare() {
        // Create 5 canvas_squares_clockwise at a time at random places at the bottom
        for (i = 0; i < num_new_canvas_squares; i++) {
            var random_spawn_x_pos = Math.floor(Math.random() * creation_width);
            // Create the my_square shape
            var my_square = new createjs.Shape();
            // Randomly determine if it is a small, medium, or a large rectangle
            var size_category = Math.floor(Math.random() * 5);
            var my_square_size;
            if (size_category == 0) {
                my_square_size = 25;
            }
            else if (size_category == 1) {
                my_square_size = 20;
            }
            // There's a greater chance of this happening
            else {
                my_square_size = 10;
            }
            // Color them with this color if I want to "reveal" them #000028
            my_square.graphics.beginFill("white").drawRect(0, 0, my_square_size, my_square_size);
            // Set position of Shape instance
            my_square.x = random_spawn_x_pos;
            my_square.y = canvas.height;
            canvas_squares.push(my_square);
            // Set the bounds
            my_square.setBounds(0, 0, my_square_size, my_square_size);
            // Add Shape instance to stage display list
            stage.addChild(my_square);
        }
    }
    
    // Have shapes flow around the mouse
    function shapeFlow(shape) {
        // Don't flow if the mouse has left the building
        if (mouse_left_window) {
            return;
        }
        var mouse_box_width = 1000;
        var mouse_box_height = 100;
        // Calculate the center of the shape
        var bounds = shape.getBounds();
        var x_offset = bounds.width/2;
        var y_offset = bounds.height/2;
        // If the shape is in the mouse's bounding box
        if (shape.x + x_offset > (mouse_x - mouse_box_width/2) &&
            shape.x + x_offset < (mouse_x + mouse_box_width/2) &&
            shape.y > (mouse_y - 50) && 
            shape.y < (mouse_y + mouse_box_height)) {
            // Move the square away from the mouse depending on it's
            // x position relative to the mouse's x position
            // Also move it at a speed based off of the difference in
            // x position
            var x_difference = (shape.x + x_offset) - mouse_x;
            var y_difference = shape.y - mouse_y;
            // Increase this to have the shapes flow away slower
            var decelleration_factor = 300;
            // The maximum speed the shapes can flow
            var maximum_speed = 5;
            // The distance away from the mouse where the shapes will be colored
            var color_distance = 50;
            var x_speed = Math.abs(decelleration_factor/x_difference);
            if (x_speed > maximum_speed) {
                x_speed = maximum_speed;   
            }
            if (x_difference < 0) {
                shape.x -= x_speed;
            }
            else {
                shape.x += x_speed;
                //console.log("mouse_x = " + mouse_x);
                //console.log("shape_x = " + shape.x);
            }
            // Only change the color if it hasn't already been changed (for optimization)
            // and it's close enough to the mouse
            if (Math.abs(x_difference) < color_distance && shape.id != 1 ) {
                // Change the color of the flowing shape
                // Randomly color it blue or yellow
                var random_color = Math.floor(Math.random() * 2);
                if (random_color == 1) {
                    shape.graphics.beginFill("rgba(23,173,207,1)").drawRect(0, 0, bounds.width, bounds.height);
                }
                else {
                    shape.graphics.beginFill("yellow").drawRect(0, 0, bounds.width, bounds.height);   
                }
                shape.id = 1;
            }
        }
    }
    
    function updateShapes(shapeArray) {
        // Loop through shapes and update them
        for (i = 0; i < shapeArray.length; i++) {
            // Rise the shape upwards
            var current_shape = shapeArray[i];
            current_shape.y -= shape_lift_speed;
            // Flow the shape around the mouse
            shapeFlow(current_shape);
            // If a shape reaches the top of the screen
            if (current_shape.y < 0) {
                // Color it white again (if it needs to be), and put it randomely 
                // somewhere at the bottom of the screen
                // I'm using shape ID to determine color info
                // shape.id == 1 if it's non-white, shape.id != 1 if it's white
                if (current_shape.id == 1) {
                    current_shape.id = 0;
                    var bounds = current_shape.getBounds();
                    current_shape.graphics.beginFill("white").drawRect(0, 0, bounds.width, bounds.height);
                }
                var random_spawn_x_pos = Math.floor(Math.random() * creation_width);
                current_shape.y = canvas.height;
                current_shape.x = random_spawn_x_pos;
                // Remove the my_square from the screen
                //stage.removeChild(current_shape);
                create_shapes = false;
            }
        }
    }
}




