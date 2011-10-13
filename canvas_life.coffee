$(document).ready -> 
  # Initialize
  canvas  = document.getElementById 'canvas'
  context = canvas.getContext '2d'
  world_w = canvas.width
  image   = context.getImageData 0,0, world_w, world_w
  pixels  = image.data
  worlds  = []
  previous = 1
  current  = 0
  alive   = true
  dead    = false


  # Loop
  just_another_day = ->
    let_there_be_life()
    draw_life()


  # Life
  let_there_be_life = ->
    for y in [1..world_w-2]
      for x in [1..world_w-2]
        worlds[current][x][y] = to_be_or_not_to_be(x,y)
    back_to_the_future()
      
  # Swap
   back_to_the_future = ->
    for y in [1..world_w-2]
      for x in [1..world_w-2]
        if worlds[current][x][y] is true
          worlds[previous][x][y] = true
        else
          worlds[previous][x][y] = false 

  # Draw
  draw_life = ->
    for y in [0..world_w-1]
      for x in [0..world_w-1]
        life = worlds[current][x][y]
        if life is true 
          draw_life_at(x,y)
        else
          draw_nothing_at(x,y)
    context.putImageData image, 0, 0


  # Helpers
  empty_world = ->
    for y in [0..world_w-1]
      for x in [0..world_w-1]
        false
    
  draw_life_at = (x,y) ->
    write_pixel x,y, 0,255,255

  draw_nothing_at = (x,y) ->
    write_pixel x,y, 0,0,0

  write_pixel = (x,y,r,g,b) ->
    offset = (x+y*world_w)*4 
    
    pixels[offset]   = r
    pixels[offset+1] = g
    pixels[offset+2] = b
    pixels[offset+3] = 255
    
  to_be_or_not_to_be = (x,y) ->
    neighbor_count = 0
    neighbors = []
    for direction in [0..7]
      neighbor = whos_there(x,y, direction)
      if neighbor is true 
        neighbor_count += 1;

    being = worlds[previous][x][y]

    should_be = null
    if being is true 
      if neighbor_count < 2 || neighbor_count > 3
        should_be = false 
      else
        should_be = true
    if being is false
      if neighbor_count is 3
        should_be = true
      else
        should_be = false

    should_be

  coordinates =
    0: [-1,-1]
    1: [ 0,-1]
    2: [ 1,-1]
    3: [-1, 1]
    4: [ 0, 1]
    5: [ 1, 1]
    6: [-1, 0]
    7: [ 1, 0]

  whos_there = (x,y, direction) ->
    offset = coordinates[direction]
    x_coord = offset[0] + x
    y_coord = offset[1] + y

    if x_coord < 0
      x_coord = world_w-1
    if x_coord > world_w-1
      x_coord = 0

    if y_coord < 0
      y_coord = world_w-1
    if y_coord > world_w-1
      y_coord = 0

    worlds[previous][x_coord][y_coord]


  # Go!
  worlds = [empty_world().slice(0), empty_world().slice(0)]

  worlds[current][101][120] = true
  worlds[current][102][121] = true
  worlds[current][100][122] = true
  worlds[current][101][122] = true
  worlds[current][102][122] = true

  worlds[current][61][200] = true
  worlds[current][62][200] = true
  worlds[current][63][200] = true

  worlds[current][80][80] = true
  worlds[current][81][80] = true
  worlds[current][80][81] = true
  worlds[current][81][81] = true

  back_to_the_future()
  animation = setInterval(just_another_day, 1000/24)
