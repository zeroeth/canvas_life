(function() {
  $(document).ready(function() {
    var acorn, alive, animation, back_to_the_future, beacon, blinker, block, canvas, context, coordinates, current, dead, draw_life, draw_life_at, draw_nothing_at, empty_world, f_pentamino, glider, image, infinite_bar, infinite_cube, just_another_day, let_there_be_life, lightweight_spaceship, pixels, previous, spawn_life, to_be_or_not_to_be, whos_there, world_w, worlds, write_pixel;
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
      should_be = null;
      if (being === true) {
        if (neighbor_count < 2 || neighbor_count > 3) {
          should_be = false;
        } else {
          should_be = true;
        }
      }
      if (being === false) {
        if (neighbor_count === 3) {
          should_be = true;
        } else {
          should_be = false;
        }
      }
      return should_be;
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
      var offset, x_coord, y_coord;
      offset = coordinates[direction];
      x_coord = offset[0] + x;
      y_coord = offset[1] + y;
      if (x_coord < 0) {
        x_coord = world_w - 1;
      }
      if (x_coord > world_w - 1) {
        x_coord = 0;
      }
      if (y_coord < 0) {
        y_coord = world_w - 1;
      }
      if (y_coord > world_w - 1) {
        y_coord = 0;
      }
      return worlds[previous][x_coord][y_coord];
    };
    spawn_life = function(x, y, being) {};
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
    back_to_the_future();
    return animation = setInterval(just_another_day, 1000 / 24);
  });
}).call(this);
