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
    
    // An array to hold the created canvas_squares_clockwise
    var canvas_squares_clockwise = [];
    // Current number of canvas_squares_clockwise
    var num_canvas_squares_clockwise = 0;
    
    var canvas_squares_counter_clockwise = [];
    var num_canvas_squares_counter_clockwise = 0;
    // The number of new canvas_squares_clockwise created everytime createSquare() is called
    var num_new_canvas_squares = 5;
    var shape_lift_speed = 3;
    var mouse_x = 0;
    var mouse_y = 0;
    
    // Keep track of the mouse coordinates
    canvas.addEventListener("mousemove", trackMouse);
    function trackMouse(event) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;

        //console.log(mouse_x + " " + mouse_y);
    }
    // Create a ticker to handles mouse interactions
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.framerate = 15;
    
    function handleTick(event) {
        //var objects = stage.getObjectUnderPoint(mouse_x, mouse_y,[mode=2]);
        //if (objects) {
        //    console.log("Got one!");
        //}
    }

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
        if (snowfall_rate == 1) {
            createSquare();   
        }

        updateShapes(canvas_squares_clockwise, true);
        updateShapes(canvas_squares_counter_clockwise, false);

    }
    
    function render() {
        stage.update();
    }
    
    function createSquare() {
        var x_offset = 200;
        // Randomly create snow at the bottom of the canvas
        var creation_width = canvas.width + x_offset;
        // Create 5 canvas_squares_clockwise at a time at random places at the top
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
            // Randomly add the square to either the rotate clockwise list or the
            // rotate counter-clockwise list
            var random_clockwise = Math.floor(Math.random() * 2);
            if (random_clockwise == 0) {
                canvas_squares_clockwise.push(my_square);
                num_canvas_squares_clockwise++;
            }
            else {
                canvas_squares_counter_clockwise.push(my_square);
                num_canvas_squares_counter_clockwise++;
            }
            // Set the bounds
            my_square.setBounds(0, 0, my_square_size, my_square_size);
            // Add Shape instance to stage display list
            stage.addChild(my_square);
        }
    }
    
    // Have shapes flow around the mouse
    function shapeFlow(shape) {
        var mouse_box_width = 1000;
        var mouse_box_height = 100;
        // Calculate the center of the shape
        var bounds = shape.getBounds();
        var x_offset = bounds.width/2;
        var y_offset = bounds.height/2;
        //console.log(x_offset);
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
            //var y_speed = Math.abs(decelleration_factor/y_difference);
            
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
    
    function updateShapes(shapeArray, clockwise) {
        // Loop through shapes and update them
        for (i = 0; i < shapeArray.length; i++) {
            var current_shape = shapeArray[i];
            if (clockwise) {
                //current_shape.rotation++;
            }
            else {
                //current_shape.rotation--;   
            }
            current_shape.y -= shape_lift_speed;

            shapeFlow(current_shape);
            if (current_shape.y < 0) {
                // Remove the my_square from the screen
                stage.removeChild(current_shape);
                // BELOW DOESN'T WORK, SOMEHOW I NEED TO REMOVE FROM ARRAY
                // Remove the my_square from the array. Added a for loop as a delay
                // because otherwise it will interfere with removing it from the screen
                /*for (i = 0; i < 5; i++) {
                    canvas_squares_clockwise.splice(i - 1, i);
                }*/
            }
        }
    }
}


//BoundingBoxHitTest = {
//  /* Mixin class to override _getObjectsUnderPoint with a more efficient method of only
//   * checking the bounding box of the children that have extended the BoundingBox mixin class.
//   * This does not offer pixel-precision but more like a html/css style approach, which is sufficient for our needs.
//   * This should be replaced by canvas's addHitRegion API when support arrives for it, since it improves accessibility.
//   * NB! does not modify children so all childrens' _getObjectsUnderPoint methods are still the old one.
//   */
//  _getObjectsUnderPoint: function(x, y, arr, mouseEvents, self) {
//    /* mouseEvents parameter is ignored
//     * if arr is given, it is populated by all the the inner-most children that are under the point (x,y)
//     * otherwise, only the front-most child is returned.
//     * NB! If a child extends BoundingBox and matches, its children are not checked for a match
//     */
//    var bb, child, match, result, i;
//    if (!self) {
//      self = this;
//    }
//    for (i = this.children.length-1; i >=0; i--) {
//      child = this.children[i];
//      bb = child._bounding_box;
//      if (bb && child.visible) {
//        match = (child.x + bb.x <= x && x < child.x + bb.x + bb.width) && (child.y + bb.y <= y && y < child.y + bb.y + bb.height);
//        if (match) {
//          if (arr) {
//            arr.push(child);
//            continue;
//          } else {
//            return child;
//          }
//        }
//      }
//      if (child instanceof createjs.Container && child.visible && !bb) {
//        result = self._getObjectsUnderPoint.call(child, x - child.x - child.regX, y - child.y - child.regY, arr, mouseEvents, self);
//        if (result) {
//          if (arr) {
//            arr.push(result);
//            continue;
//          } else {
//            return result;
//          }
//        }
//      }
//    }
//    return null;
//  }
//};
//
//BoundingBox = {
//  /* The mixin class that all DisplayObjects should extend if they want to emit Mouse Events
//   * The bounding box is defined relative to the object itself and must be updated manually as needed.
//   */
//  _bounding_box: null,
//  setBoundingBox: function(x, y, w, h) {
//    return this._bounding_box = new createjs.Rectangle(x, y, w, h);
//  }
//};



