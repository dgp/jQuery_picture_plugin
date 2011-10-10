$(function() {
  (function ( $ ) {
    var image_plugin = {
      setData : function(id) {
        $('#' + id).data('dinesh_picture', {
          current_position : 3,
          first_click : 0,
          last_position : 0,
          scroll_position: 30,
          first_click_scroll : 0,
        });
      },
      set_image_size : function(img_width, img_height, object) {
        var name = $(object).attr('class');
        $(' img').css({
          'width': img_width, 
          'height': img_height, 
          'position': 'relative',
          'float': 'left'
        });
      },
      set_content_size : function(item, img_width, img_height) {
        var total_width = (parseInt(item, 10) * parseInt(img_width, 10)) + 'px';
        $('#picture_content').css({
          'width': total_width,
          'height' : img_height,
          'overflow': 'hidden'
        });
      },
      set_image_grid_size : function(size, img_width, img_height) {
        var total_width = 30  + (parseInt(size, 10) * parseInt(img_width, 10)) + 'px';
        $('.image_grid').css({
          'width': total_width,
          'height' : img_height
        });
      },
      set_scroll_number_in_footer : function(size, visible, list_width) {
        $('#picture_content').append('<div id = scroll></div>');
        var lt_width = parseInt(list_width, 10);
        for (var i = 1; i <= size; i++) {
          $('#picture_content #scroll').append("<li><a href ='#' id = " + i + ">" + i + "</a></li>");
        }
        $('#scroll').css({'width': (size * (lt_width)) });
        $('#scroll li').css({'width': list_width});
        $('#scroll').append('<div id = active></div>');
        $('a').addClass('footer');
      },
      hide_arrows : function(visible, size, width, image_position) {
        var current_object = $('#picture_content').data('dinesh_picture');
        console.log(image_position);
        if(current_object.current_position <= image_position) {
          $("#previous").hide();
          $('#next').show();
        } else {
          if(current_object.current_position >= (size - (visible - image_position))) {
            $('#next').hide();
            $('#previous').show();
          } else if(current_object.current_position <= (size- image_position)) {
            $("#previous").show();
            $('#next').show();
          }
        }
      },
      image_movement : function(visible, size, current_position, width, image_position) {
        var current_object = $('#picture_content').data('dinesh_picture');
        var position = 0;
        console.log('image');
        if (current_position >= (size - (parseInt(visible, 10) - image_position))) {
          for(var i = 0; i <= (visible -image_position); i++) {
            if (current_position === "" + ((parseInt(size,10) - i))) {
              if (current_object.first_click === 0) {
                if(current_object.last_position == 0) {
                  position = (((parseInt(current_position, 10) -(parseInt(visible) - i)) - parseInt(current_object.last_position, 10) ) * parseInt(width, 10) );
                } else {
                  if ((parseInt(current_position, 10) - parseInt(current_object.last_position) ) > image_position){
                    if(current_object.last_position < image_position ) {
                      position = (((size - (visible - image_position)) - (image_position) ))  * parseInt(width, 10);
                    } else {
                      position = ((size - (visible - image_position)) - (current_object.last_position) )  * parseInt(width, 10);
                    }
                  } else if ((current_object.last_position < (size - (visible - image_position))) && ((current_position >= (size - (visible - image_position))))){
                    position = ((size - (visible - image_position)) - parseInt(current_object.last_position) ) * parseInt(width, 10);
                  }  
                }
                $("img").animate({"left": '-=' + position + "px"}, "slow");
                current_object.first_click++;
              }
              //by arrow it reach last hide the next arrow
              $("#next").hide();
              //by clicking number
              // break;
            }
          } 
        } else if((current_position < (size - (visible - image_position)) && current_object.last_position > (size - (visible - image_position))) && current_position > image_position) {
          current_object.first_click = 0;
          position = ((size - (visible - image_position)) - current_position) * parseInt(width, 10);
          $("img").animate({"left": '+=' + position + "px"}, "slow");
        } else if(current_position < image_position && current_object.last_position > image_position ) {
          if (current_position < image_position && current_object.last_position > (size - (visible - image_position))) {
            position = ( (size - (visible - image_position)) - image_position) * parseInt(width, 10);
          } else if (current_object.last_position <= (size - (visible - image_position))){
            position = ( (parseInt (current_object.last_position, 10) - (image_position))) * parseInt(width, 10);
          }
          current_object.first_click = 0;
          current_object.last_position = current_position;
          $("img").animate({"left": '+=' + position + "px"}, "slow");
        }
        else {
          current_object.first_click = 0
          position = ( ( parseInt (current_position, 10) - image_position) * parseInt(width, 10) );
          $("img").animate({"left": -position + "px"}, "slow");
        }
        current_object.last_position = current_position;
      },
      apply_style : function(start_position, visible_item, image_position, size) {
        if ((start_position - image_position) <= image_position && start_position > image_position) {
          for(var j = 0; j < image_position; j++ ) {
            $('#scroll a:eq(' + ((parseInt(start_position, 10) -j) - 1) +')').addClass('selected1');
          }
          for (var i = 0; i <= (visible_item - image_position); i++) {
            $('#scroll a:eq(' + (parseInt(start_position, 10) + i - 1) +')').addClass('selected1');
          }
        } else if(start_position > image_position && start_position <= (size - (visible_item - image_position))) {
          for(var j = 0; j < image_position; j++ ) {
            $('#scroll a:eq(' + ((parseInt(start_position, 10) -j) - 1) +')').addClass('selected1');
          }
          for (var i = 0; i <= (visible_item - image_position); i++) {
            $('#scroll a:eq(' + (parseInt(start_position, 10) + i - 1) +')').addClass('selected1');
          } 
        } else if (start_position <= image_position) {
            for (var i = 0; i < visible_item; i++) {
              $('#scroll a:eq(' + (parseInt(i, 10)) +')').addClass('selected1');
            }
        } else if (start_position > (size - (visible_item - image_position))) {
          var size = size - visible_item;
          for (var i = 0; i < visible_item; i++) {
            $('#scroll a:eq(' + (size + i) +')').addClass('selected1');
          }
        }
      },
      show_current_position : function() {
        var current_object = $('#picture_content').data('dinesh_picture');
        var position = (parseInt(current_object.current_position, 10) - 1)
        $('#scroll a:eq('+ position +')').addClass('selected');
        $('.image_grid img:eq('+ position +')').addClass('image_selected');
      },
      remove_previous_position : function() {
        $('#scroll a').removeClass('selected');
        $('.image_grid img').removeClass('image_selected');
      },
      scroll_movement : function(current_position, size, visible, list_width, image_position) {
        var scroll_position = 0;
        var lt_width = parseInt(list_width, 10) - 1;
        $('#scroll a').removeClass('selected1');
        var current_object = $('#picture_content').data('dinesh_picture');
        if (current_position > (size - parseInt(visible, 10) + (image_position - 1))) {
          for(var i = 0; i <= (visible - image_position); i++) {
            if (current_position === "" + ((parseInt(size,10) - i)) || current_position === ((parseInt(size,10) - i))) {
              if (current_object.first_click_scroll === 0) {
                if(current_object.last_position == 0) {
                  image_plugin.apply_style((parseInt(current_position, 10)), visible, image_plugin, size);
                  // scroll_position = (((parseInt(current_position, 10) - (parseInt(visible) - i)) - parseInt(current_object.last_position, 10)) * lt_width);
                } else {
                  image_plugin.apply_style(current_position, visible, image_position, size);
                  // scroll_position = (((parseInt(current_position, 10) - parseInt(current_object.last_position)) - (visible- (image_position + i))) * lt_width);
                }
                current_object.first_click_scroll++;
              }
              image_plugin.apply_style(current_position, visible, image_position, size);
            }
          }
        } else if(current_object.last_position == 0) {
          current_object.first_click_scroll = 0;
          image_plugin.apply_style(current_position, visible, image_position, size);
          // scroll_position = (parseInt(current_position, 10) - image_position) * lt_width;
        } else if ((current_object.last_position >= (size - (visible - image_position)) && (current_object.last_position < current_position))) {
          current_object.first_click_scroll = 0;
          image_plugin.apply_style(current_position, visible, image_position, size);
          // scroll_position = ( current_position - (size - (visible - (image_position - 1)))) * lt_width;
        } else if((current_object.last_position >= (size - (visible - image_position))) && (current_object.last_position > current_position )) {
          current_object.first_click_scroll = 0;
          image_plugin.apply_style(current_position, visible, image_position, size);
          // scroll_position = ( parseInt(current_position, 10)- (size - (visible - image_position))) * lt_width;
        } else if (current_position <= image_position && current_object.last_position >= image_position){
          image_plugin.apply_style(current_position, visible, image_position, size);
          // scroll_position = (parseInt(current_position, 10) - ((parseInt(current_object.last_position, 10)) - (image_position - current_position))) * lt_width;
        } else {
          current_object.first_click_scroll = 0;
          image_plugin.apply_style(current_position, visible, image_position, size);
          // scroll_position = (parseInt(current_position, 10) - (parseInt(current_object.last_position, 10)) ) * lt_width;
        }
        if (current_object.last_position < current_position && current_position % 5 == 0) {
          if (current_position > 20 ) {
            scroll_position += 8;
          }
          $('#active').css({'width': ((visible * (lt_width + 1)) + 5) + 'px'});
        } else if (current_object.last_position > current_position && current_position % 5 == 0){
          if (current_position < 20 ) {
            scroll_position -= 8;
          }
        }
        // $("#scroll #active").animate({"right": '-=' + scroll_position + "px"}, "slow");
      }
    };
    $.fn.dinesh_picture = function(options) {
      var width = $('body').outerWidth();
      image_width = Math.floor(width/5);
      var default_settings = {
        image_width:  image_width +'px',
        image_height: '500px',
        content_height: '540px',
        list_width : '55px',
        image_position : 3,
        image_visible: 5
      };
      return this.each(function () {
        var size = 0;
        if (options) {
          $.extend(default_settings, options);
        }
        var current_obj = this;
        //wrap into div class
        $(this).wrap('<div id = picture_content></div>');
        //remove the class name which given by user
        $(this).removeClass();
        //add the class name
        $(this).addClass('image_grid');
        //getting the image count
        size = $('.image_grid img').size();
        default_settings.list_width = Math.floor(width/size);
        console.log(default_settings.list_width);
        image_plugin.set_image_size(default_settings.image_width, default_settings.image_height, current_obj);
        image_plugin.set_content_size(default_settings.image_visible, default_settings.image_width, default_settings.content_height);
        image_plugin.set_image_grid_size(size, default_settings.image_width, default_settings.image_height);
        image_plugin.set_scroll_number_in_footer(size, default_settings.image_visible, default_settings.list_width);
        $('#picture_content').append("<a href = '#' id = previous></a>");
        $('#picture_content').append("<a href='#' id = next></a>");
        image_plugin.setData('picture_content');
        //disable the prevbutton initially
        if (default_settings.image_visible < size) {
          $("#previous").hide();
        }
        else
        {
          $("#next").hide();
          $("#previous").hide();
        }
        var current_object = $('#picture_content').data('dinesh_picture');
        $("#next").live('click', function(){
          current_object.current_position = ++current_object.current_position;
          current_object.first_click_scroll = 0;
          current_object.scroll_position = 0;
          console.log('next' + (current_object.current_position < default_settings.image_position ) + current_object.current_position + default_settings.image_position);
          console.log((current_object.last_position < current_object.current_position));
          if(!(current_object.current_position <= default_settings.image_position ) ) {
            $("img").animate({"left": '-=' + default_settings.image_width}, "slow");
            image_plugin.scroll_movement(current_object.current_position, size, default_settings.image_visible, default_settings.list_width, default_settings.image_position);
          }
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size, default_settings.image_width, default_settings.image_position);
          current_object.last_position = current_object.current_position;
        });
        $("#previous").live('click', function(){
          current_object.current_position = --current_object.current_position;
          current_object.first_click_scroll = 0;
          current_object.scroll_position = 0;
          if(!((current_object.last_position >= ((size - (default_settings.image_visible - default_settings.image_position) ))) && (current_object.current_position>= ((size - (default_settings.image_visible - default_settings.image_position)))))) {
            $("img").animate({"left": '+=' + default_settings.image_width}, "slow");
            image_plugin.scroll_movement(current_object.current_position, size, default_settings.image_visible, default_settings.list_width, default_settings.image_position);
          }
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size, default_settings.image_width, default_settings.image_position);
          current_object.last_position = current_object.current_position;
        });
        $('#scroll a').live('click', function() {
          var current_position = $(this).text();
          current_object.current_position = current_position;
          if( !(current_position <= default_settings.image_position && current_object.last_position <= default_settings.image_position )) {
            image_plugin.scroll_movement(current_position, size, default_settings.image_visible, default_settings.list_width, default_settings.image_position);
            image_plugin.image_movement(default_settings.image_visible, size, current_position, default_settings.image_width, default_settings.image_position);            
          }
          image_plugin.remove_previous_position();
          image_plugin.show_current_position();
          image_plugin.hide_arrows(default_settings.image_visible, size, default_settings.image_width, default_settings.image_position);
        });
        image_plugin.show_current_position();
        image_plugin.apply_style(current_object.current_position, default_settings.image_visible, default_settings.image_position, size);
      });
    }
  }(jQuery));
});