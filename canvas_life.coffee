$(document).ready -> 
  # Initialize
  canvas  = document.getElementById 'canvas'
  context = canvas.getContext '2d'
  world_w = canvas.width
  world_h = canvas.height
  image   = context.getImageData 0,0, world_w, world_h
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
    for y in [0..world_h-1]
      for x in [0..world_w-1]
        worlds[current][y][x] = to_be_or_not_to_be(x,y)
    back_to_the_future()
      

  # Swap
   back_to_the_future = ->
    for y in [0..world_h-1]
      for x in [0..world_w-1]
        if worlds[current][y][x] is true
          worlds[previous][y][x] = true
        else
          worlds[previous][y][x] = false 


  # Draw
  draw_life = ->
    for y in [0..world_h-1]
      for x in [0..world_w-1]
        life = worlds[current][y][x]
        if life is true 
          draw_life_at(x,y)
        else
          draw_nothing_at(x,y)
    context.putImageData image, 0, 0


  # Initialize worlds
  empty_world = ->
    for y in [0..world_h-1]
      for x in [0..world_w-1]
        false
   

  # Drawing helpers
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
    

  # Game of life rules
  to_be_or_not_to_be = (x,y) ->
    neighbor_count = 0
    neighbors = []
    for direction in [0..7]
      neighbor = whos_there(x,y, direction)
      if neighbor is true 
        neighbor_count += 1;

    being = worlds[previous][y][x]

    if being is true 
      if neighbor_count < 2 || neighbor_count > 3
        should_be = false 
      else
        should_be = true
    else
      if neighbor_count is 3
        should_be = true
      else
        should_be = false


  # Neighbor coordinates
  coordinates =
    0: {x:-1,y:-1}
    1: {x: 0,y:-1}
    2: {x: 1,y:-1}
    3: {x:-1,y: 1}
    4: {x: 0,y: 1}
    5: {x: 1,y: 1}
    6: {x:-1,y: 0}
    7: {x: 1,y: 0}


  # Test neighbors
  whos_there = (x,y, direction) ->
    offset = coordinates[direction]
    coords = coordinate_wrap(offset.x+x, offset.y+y)

    worlds[previous][coords.y][coords.x]


  # Shape insert
  spawn_life = (x_dest,y_dest, being) ->
    coords
    dna = beings[being]
    for y in [0..dna.length-1]
      for x in [0..dna[y].length-1]
        coords = coordinate_wrap(x+x_dest, y+y_dest)
        if dna[y][x] is 0
          worlds[current][coords.y][coords.x] = false 
        else
          worlds[current][coords.y][coords.x] = true
    coords

  
  # Donut world
  coordinate_wrap = (x,y) ->
    {x:digit_wrap_x(x), y:digit_wrap_y(y)}


  # JS modulo fix
  digit_wrap_x = (value) ->
    mod = value%world_w
    if mod < 0
      mod + world_w
    else
      mod

  digit_wrap_y = (value) ->
    mod = value%world_h
    if mod < 0
      mod + world_h
    else
      mod

  # Life forms!
  beings = 
    glider: [
      [0,1,0]
      [0,0,1]
      [1,1,1]
    ]

    lightweight_spaceship: [
      [1,0,0,1,0]
      [0,0,0,0,1]
      [1,0,0,0,1]
      [0,1,1,1,1]
    ]

    blinker: [
      [1,1,1]
    ]

    beacon: [
      [1,1,0,0]
      [1,0,0,0]
      [0,0,0,1]
      [0,0,1,1]
    ]

    block: [
      [1,1]
      [1,1]
    ]

    f_pentamino: [
      [0,1,1]
      [1,1,0]
      [0,1,0]
    ]

    acorn: [
      [0,1,0,0,0,0,0]
      [0,0,0,1,0,0,0]
      [1,1,0,0,1,1,1]
    ]

    infinite_cube: [
      [1,1,1,0,1]
      [1,0,0,0,0]
      [0,0,0,1,1]
      [0,1,1,0,1]
      [1,0,1,0,1]
    ]

    infinite_bar: [
      [1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1]
    ]

    slab: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

  # Go!
  worlds = [empty_world().slice(0), empty_world().slice(0)]

  for being of beings 
    x_coord = Math.floor(Math.random()*world_w)
    y_coord = Math.floor(Math.random()*world_h)
    spawn_life x_coord, y_coord, being

  back_to_the_future()

  animation = setInterval(just_another_day, 1000/24)
