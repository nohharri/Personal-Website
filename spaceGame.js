$(document).ready(init);

var global = new function()
{
    this.mouse_x = 0.0;
    this.mouse_y = 0.0;
    this.smoke_shapes = new Array();
    this.background_shapes = new Array();
    this.clients = new Array();
    this.environment_speed = 10;

    this.tick = 0;
    this.game_object_arrays = [this.smoke_shapes, this.background_shapes, this.clients];
    
    this.attempting_connection = false;
    this.connected = false;
    this.client_id = Math.floor(Math.random() * 99999999);
    this.client_region = "...";
    this.other_clients = new Object();
}

function dist(a, b)
{
    var d_x = Math.abs(a.x - b.x);
    var d_y = Math.abs(a.y - b.y);
    return Math.sqrt(d_x * d_x + d_y * d_y);
}

function init()
{
    /*
    $.getJSON("https://www.geoplugin.net/json.gp?jsoncallback=?",
    function (data) {
        for (var i in data) {
            alert(i);
        }
    });*/

    var socket = new WebSocket('wss://ayarger.com:8888/ws');
    init_socket();
    global.attempting_connection = true;

    stage = new createjs.Stage("myCanvas");
    player = new fish_object(global.client_id, true);
    
    stage.mouseMoveOutside = true;
    
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", update);
    stage.addEventListener("stagemousemove", handle_mouse_move);

    //var heart_image = new createjs.Bitmap("/welcome_page_src/PixelHeart.png");
    //    heart_image.x = 200;
    //  heart_image.y = 200;
    //stage.addChild(heart_image);

    function fish_object(id, player_controlled)
    {
        this.id = id;
        this.player_controlled = player_controlled;
        this.shape = new createjs.Container();
    
        this.region = "safsfsafdsfsdfafafsafsfdfasfdsafsafsadfs";
        /*this.region_text = new createjs.Text(String(id), "20pxArial", "#ffffff");
        this.region_text.textBaseline = "alphabetic";
        this.region_text.y = 10;*/

        this.black_rect = new createjs.Shape();
        this.black_rect.graphics.beginFill("black").drawRect(0, 0, 100, 50);
    
        this.white_window = new createjs.Shape();
        this.white_window.graphics.beginFill("white").drawRect(80, 10, 10, 10);
   
        this.white_mouth = new createjs.Shape();
        this.white_mouth.graphics.beginFill("white").drawRect(80, 30, 21, 10);

        this.shape.addChild(this.black_rect);
        this.shape.addChild(this.white_window)
        this.shape.addChild(this.white_mouth);
        //this.shape.addChild(this.region_text);
        this.shape.regX = 50;
        this.shape.regY = 25; 

        stage.addChild(this.shape);
        global.clients.push(this);
        if(!player_controlled)
            global.other_clients[id] = this;
        this.vertical_velocity = 0;
        this.horizontal_velocity = 0;
        this.desired_y = 0;
        this.desired_x = 0;

        this.dead = false;

        this.update = function()
        {
            easing = 0.5;
            if(!this.player_controlled)
                easing = 0.1;

            if(this.player_controlled)
            {
                this.desired_y = global.mouse_y + Math.sin(global.tick * 0.1) * 10;
                this.desired_x = global.mouse_x;
            }
            
            this.vertical_velocity = (this.desired_y - this.shape.y) * easing;
            this.horizontal_velocity = (this.desired_x - this.shape.x) * easing;

            this.shape.y += this.vertical_velocity;
            this.shape.x += this.horizontal_velocity;
        
            this.shape.scaleY = 1 / (1 + Math.abs(this.vertical_velocity) * 0.02);
            if(this.horizontal_velocity < 0)
                this.shape.scaleX = 1 / (1 + Math.abs(this.horizontal_velocity) * 0.01);
            else
                this.shape.scaleX = 1 + this.horizontal_velocity * 0.02;
        
            if (this.shape.scaleY < 0.1)
                this.shape.scaleY = 0.1

            this.shape.rotation += (this.vertical_velocity*3 - this.shape.rotation) * easing * 0.3;
        
            // smoke spawn
            if(global.tick % 5 == 0)
                new smoke_shape(this);       

            if(global.tick % 120 == 0)
                this.white_window.scaleY = 0;
            else
                this.white_window.scaleY = 1;
         
            if(this.dead)
            {
                this.shape.alpha -= 0.01;
                if(this.shape.alpha <= 0.0)
                {
                    stage.removeChild(this.shape);
                    global.clients.splice(global.clients.indexOf(this), 1);
                    if(!this.player_controlled)
                        delete global.other_clients[this.id];

                }
            }
            return true;
        }
    }

    function background_shape()
    {
        this.depth = Math.random() - 0.5;
        if(this.depth < 0.1)
            this.depth = 0.1;

        // Construct random shape.
        this.shape = new createjs.Shape(); 
        this.shape.graphics.beginFill("black");
        var num_nodes = Math.floor(Math.random() * 10 + 1);
        var nodes = new Array();
        for(var i = 0; i < num_nodes; i++)
            nodes.push(new createjs.Point(Math.random() * 400 - 200, Math.random() * 400 - 200));
        
        for(var i = 0; i < num_nodes; i++)
        {
            if(i == 0)
                this.shape.graphics.moveTo(nodes[i].x, nodes[i].y);
            else
                this.shape.graphics.lineTo(nodes[i].x, nodes[i].y);
        }
        this.shape.graphics.lineTo(nodes[0].x, nodes[0].y);
        this.shape.graphics.endStroke();
        this.shape.alpha = this.depth;
        this.shape.scaleX = this.depth;
        this.shape.scaleY = this.depth;

        // Move off screen
        this.shape.x = stage.canvas.width + 400;
        this.shape.y = stage.canvas.height * Math.random();

        stage.addChild(this.shape);
        stage.setChildIndex(player, stage.getNumChildren()-1);
        global.background_shapes.push(this);

        this.rotational_velocity = Math.random() * 0.2 - 0.1
        this.vertical_velocity = Math.random() - 0.5;
        this.horizontal_velocity = global.environment_speed;
        this.player_force = function()
        {
            if(this.depth < 0.25)
                return;
           
            var distance = dist(this.shape, player.shape);
            var f_y = (this.shape.y - player.shape.y) / (distance);
            var f_x = (this.shape.x - player.shape.x) / (distance);
            
            f_y /= distance;
            f_x /= distance;

            this.vertical_velocity += f_y;
            this.horizontal_velocity -= f_x;
        }

        // return false if should be destroyed.
        this.update = function()
        {
            this.player_force();
            this.shape.rotation += this.rotational_velocity;
            this.shape.y += this.vertical_velocity;
            this.shape.x -= this.horizontal_velocity * this.depth;
            if(this.shape.x < -400)
            {
                stage.removeChild(this.shape);
                return false;
            }
            return true;
        }
    }

    function smoke_shape(fish_ob)
    {
        this.shape = new createjs.Shape();
        var rand_radius_offset = Math.random() * 20 - 10;
        var rand_offset_y = Math.random() * 20 - 10;
        var angle_offset_y = 50 * Math.sin(fish_ob.shape.rotation * (Math.PI / 180))
        this.shape.graphics.beginFill("black").drawCircle(fish_ob.shape.x - 40, fish_ob.shape.y - angle_offset_y + rand_offset_y, 20 + rand_radius_offset);
        this.shape.alpha = 0.2;
        this.vertical_velocity = 0;
        this.horizontal_velocity = global.environment_speed;
        stage.addChild(this.shape);
        global.smoke_shapes.push(this);   
        
        this.update = function()
        {
            this.shape.alpha -= 0.002;
            this.horizontal_velocity *= 0.99;
            this.shape.x -= this.horizontal_velocity;
            this.vertical_velocity += 0.1;
            this.shape.y -= this.vertical_velocity;
            if(this.shape.alpha <= 0.0)
            {
                stage.removeChild(this.shape); 
                return false;
            }
            return true;
        }
    }

    function handle_mouse_move(evt)
    {
        global.mouse_x = evt.stageX;
        global.mouse_y = evt.stageY;
    }
    
    function update(evt)
    {
        global.tick ++;

        update_game_object_arrays();
        
        if(global.tick % 20 == 0)
            new background_shape();

        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        stage.canvas.style.cursor = "none";
       
        // NETWORKING
        if(!global.connected && !global.attempting_connection && global.tick % 120 == 0)
        {
            global.attempting_connection = true;
            socket = new WebSocket('wss://ayarger.com:8888/ws');
            init_socket();
        }
        if(global.connected && global.tick % 2 == 0)
            socket.send("update " + global.client_id +
                        " " + Math.floor(player.shape.x) + " " + Math.floor(player.shape.y));
        stage.update();
    }

    function update_game_object_arrays()
    {
        for(var i = 0; i < global.game_object_arrays.length; i++)
        {
            var arr = global.game_object_arrays[i];
            for(var j = 0; j < arr.length; j++)
            {
                var game_object = arr[j];
                if(!game_object.update())
                {
                    arr.splice(j, 1);
                    j --;
                }
            }
        } 
    }
    
    function init_socket()
    {
        socket.onopen = function(evt)
        {
            global.attempting_connection = false;
            global.connected = true;
            socket.send("new " + global.client_id + ' ' + global.client_city);
        }
        socket.onerror = function(error)
        {
            global.attempting_connection = false;
            global.connected = false;
        }
        socket.onmessage = function(evt)
        {
            var message = evt.data;
            var elements = message.split(" ");
            
            if(elements[1] != global.client_id)
            {
                if(elements[0] == "update")
                {
                    if(global.other_clients[elements[1]] == null)
                    {
                        new fish_object(elements[1], false);
                    }
                    global.other_clients[elements[1]].desired_x = elements[2];
                    global.other_clients[elements[1]].desired_y = elements[3];
                    global.other_clients[elements[1]].region = elements[4];
                    console.log(elements[4])
                }
                else if(elements[0] == "remove")
                {
                    if(global.other_clients[elements[1]] != null)
                    { 
                        global.other_clients[elements[1]].dead = true;
                    }
                }
            }
        }
        socket.onclose = function(evt)
        {
            for(var i = 0; i < global.clients.length; i++)
            {
                if(global.clients[i].id != global.client_id)
                {
                    global.clients[i].dead = true;
                }
            }
            global.connected = false;
        }
    }
    $('body').on('contextmenu', '#myCanvas', function(e){ return false; });
}
