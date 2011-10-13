(function() {
  $(document).ready(function() {
    var acorn, alive, animation, back_to_the_future, beacon, blinker, block, canvas, context, coordinate_wrap, coordinates, current, dead, digit_wrap, draw_life, draw_life_at, draw_nothing_at, empty_world, f_pentamino, glider, image, infinite_bar, infinite_cube, just_another_day, let_there_be_life, lightweight_spaceship, pixels, previous, spawn_life, to_be_or_not_to_be, whos_there, world_w, worlds, write_pixel;
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    world_w = canvas.width;
    image = context.getImageData(0, 0, world_w, world_w);
    pixels = image.data;
    worlds = [];
    previous = 1;
    current = 0;
    alive = true;
    dead = false;
    just_another_day = function() {
      let_there_be_life();
      return draw_life();
    };
    let_there_be_life = function() {
      var x, y, _ref, _ref2;
      for (y = 1, _ref = world_w - 2; 1 <= _ref ? y <= _ref : y >= _ref; 1 <= _ref ? y++ : y--) {
        for (x = 1, _ref2 = world_w - 2; 1 <= _ref2 ? x <= _ref2 : x >= _ref2; 1 <= _ref2 ? x++ : x--) {
          worlds[current][x][y] = to_be_or_not_to_be(x, y);
        }
      }
      return back_to_the_future();
    };
    back_to_the_future = function() {
      var x, y, _ref, _results;
      _results = [];
      for (y = 1, _ref = world_w - 2; 1 <= _ref ? y <= _ref : y >= _ref; 1 <= _ref ? y++ : y--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 1, _ref2 = world_w - 2; 1 <= _ref2 ? x <= _ref2 : x >= _ref2; 1 <= _ref2 ? x++ : x--) {
            _results2.push(worlds[current][x][y] === true ? worlds[previous][x][y] = true : worlds[previous][x][y] = false);
          }
          return _results2;
        })());
      }
      return _results;
    };
    draw_life = function() {
      var life, x, y, _ref, _ref2;
      for (y = 0, _ref = world_w - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        for (x = 0, _ref2 = world_w - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          life = worlds[current][x][y];
          if (life === true) {
            draw_life_at(x, y);
          } else {
            draw_nothing_at(x, y);
          }
        }
      }
      return context.putImageData(image, 0, 0);
    };
    empty_world = function() {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = world_w - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = world_w - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            _results2.push(false);
          }
          return _results2;
        })());
      }
      return _results;
    };
    draw_life_at = function(x, y) {
      return write_pixel(x, y, 0, 255, 255);
    };
    draw_nothing_at = function(x, y) {
      return write_pixel(x, y, 0, 0, 0);
    };
    write_pixel = function(x, y, r, g, b) {
      var offset;
      offset = (x + y * world_w) * 4;
      pixels[offset] = r;
      pixels[offset + 1] = g;
      pixels[offset + 2] = b;
      return pixels[offset + 3] = 255;
    };
    to_be_or_not_to_be = function(x, y) {
      var being, direction, neighbor, neighbor_count, neighbors, should_be;
      neighbor_count = 0;
      neighbors = [];
      for (direction = 0; direction <= 7; direction++) {
        neighbor = whos_there(x, y, direction);
        if (neighbor === true) {
          neighbor_count += 1;
        }
      }
      being = worlds[previous][x][y];
      if (being === true) {
        if (neighbor_count < 2 || neighbor_count > 3) {
          return should_be = false;
        } else {
          return should_be = true;
        }
      } else {
        if (neighbor_count === 3) {
          return should_be = true;
        } else {
          return should_be = false;
        }
      }
    };
    coordinates = {
      0: [-1, -1],
      1: [0, -1],
      2: [1, -1],
      3: [-1, 1],
      4: [0, 1],
      5: [1, 1],
      6: [-1, 0],
      7: [1, 0]
    };
    whos_there = function(x, y, direction) {
      var coords, offset;
      offset = coordinates[direction];
      coords = coordinate_wrap(offset[0] + x, offset[1] + y);
      return worlds[previous][coords.x][coords.y];
    };
    spawn_life = function(x_dest, y_dest, being) {
      coords;
      var bb, coords, x, y, _ref, _ref2;
      for (bb = 0; bb <= 0; bb++) {
        console.info("woo");
      }
      for (y = 0, _ref = being.length - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        for (x = 0, _ref2 = being[y].length - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          coords = coordinate_wrap(x + x_dest, y + y_dest);
          if (being[y][x] === 0) {
            worlds[current][coords.x][coords.y] = false;
          } else {
            worlds[current][coords.x][coords.y] = true;
          }
        }
      }
      return coords;
    };
    coordinate_wrap = function(x, y) {
      return {
        x: digit_wrap(x),
        y: digit_wrap(y)
      };
    };
    digit_wrap = function(value) {
      var mod;
      mod = value % world_w;
      if (mod < 0) {
        return mod + world_w;
      } else {
        return mod;
      }
    };
    glider = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
    lightweight_spaceship = [[1, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1]];
    blinker = [[1, 1, 1]];
    beacon = [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]];
    block = [[1, 1], [1, 1]];
    f_pentamino = [[0, 1, 1], [1, 1, 0], [0, 1, 0]];
    acorn = [[0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 0, 0, 1, 1, 1]];
    infinite_cube = [[1, 1, 1, 0, 1], [1, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 1, 1, 0, 1], [1, 0, 1, 0, 1]];
    infinite_bar = [[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1]];
    worlds = [empty_world().slice(0), empty_world().slice(0)];
    spawn_life(20, 20, f_pentamino);
    spawn_life(10, 10, lightweight_spaceship);
    spawn_life(50, 100, acorn);
    back_to_the_future();
    return animation = setInterval(just_another_day, 1000 / 24);
  });
}).call(this);
