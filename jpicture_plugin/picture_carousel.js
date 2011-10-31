$(function() {
  (function ( $ ) {
    var plugin = {
      setData : function(id) {
        $('#' + id).data('jPicture_plugin', {
          current_position : 3,
          first_click : 0,
          last_position : 0,
          scroll_position: 30,
          first_click_scroll : 0,
          constant : 1,
        });
      },
      initialize_content : function($obj) {
        var current_object = $('#picture_content').data('jPicture_plugin');
        //wrap into div class
        $($obj).wrap('<div id = picture_content></div>');
        //remove the class name which given by user
        $($obj).removeClass();
        //add the class name
        $($obj).addClass('image_grid');
        //getting the image count
      },
      initialize_gird : function(image_width, image_height, current_obj, visible_image, content_height, size, scroll_width) {
        var current_object = $('#picture_content').data('jPicture_plugin');
        plugin.set_image_size(image_width, image_height, current_obj);
        plugin.set_content_size(visible_image, image_width, content_height);
        plugin.set_image_grid_size(size, image_width, image_height);
        plugin.set_scroll_number(size, visible_image, scroll_width);
        $('#picture_content').append("<a href = '#' id = previous></a>");
        $('#picture_content').append("<a href='#' id = next></a>");
        plugin.setData('picture_content');
      },
      toggle_postion : function () {
        plugin.remove_previous_position();
        plugin.show_current_position();
      },
      image_process : function(image_position, image_width, visible_image, scroll_width, size, $obj) {
        var current_object = $('#picture_content').data('jPicture_plugin');
        var current_id = $($obj).attr('id');
        if(current_id == 'next' || current_id == 'previous') {
          current_object.first_click_scroll = 0;
          current_object.first_click = 0;
        }
        if(current_id == 'next') {
          current_object.current_position = ++current_object.current_position;
          if(!(current_object.current_position <= image_position ) ) {
            $("ul.image_grid li").animate({"left": '-=' + image_width}, "slow");
            plugin.scroll_movement(current_object.current_position, size, visible_image, scroll_width, image_position);
          }
        } else if(current_id == 'previous') {
          current_object.current_position = --current_object.current_position;
          if(!((current_object.last_position >= ((size - (visible_image - image_position) ))) && (current_object.current_position>= ((size - (visible_image - image_position)))))) {
            $("ul.image_grid li").animate({"left": '+=' + image_width}, "slow");
            plugin.scroll_movement(current_object.current_position, size, visible_image, scroll_width, image_position);
          }
        } else {
          var current_position = $($obj).text();
          current_object.current_position = current_position;
          console.log(current_position);
          if( !(current_position <= image_position && current_object.last_position <= image_position )) {
            plugin.scroll_movement(current_position, size, visible_image, scroll_width, image_position);
            plugin.image_movement(visible_image, size, current_position, image_width, image_position);            
          }            
        }
        plugin.hide_arrows(visible_image, size, image_width, image_position);
        plugin.toggle_postion();
        current_object.last_position = current_object.current_position;
      },
      set_image_size : function(img_width, img_height, object) {
        var name = $(object).attr('class');
        $('.image_grid li').css({
          'width': '360px',
          'height': 'auto',
          'float': 'left',
          'position': 'relative',
          'list-style': 'none'
        });
        $(' img').css({
          'width': img_width,
          'height': img_height,
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
      set_scroll_number : function(size, visible, list_width) {
        // $('#picture_content').append('<div class="clear"></div>');
        $('body').append('<div id = scroll></div>');
        var lt_width = parseInt(list_width, 10);
        for (var i = 1; i <= size; i++) {
          $('#scroll').append("<li><a href ='#' id = " + i + ">" + i + "</a></li>");
        }
        $('#scroll').css({'width': (size * (lt_width)) });
        $('#scroll li').css({'width': list_width});
        $('#scroll').append('<div id = active></div>');
        $('#active').css({'width': ((visible * (lt_width - 4))) + 'px'});
        $('a').addClass('scroll_number');
      },
      hide_arrows : function(visible, size, width, image_position) {
        var current_object = $('#picture_content').data('jPicture_plugin');
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
      },image_move_at_last : function(current_position, image_position, size, visible, width) {
        var current_object = $('#picture_content').data('jPicture_plugin');
        if ((parseInt(current_position, 10) - parseInt(current_object.last_position) ) > image_position){
          position = current_object.last_position < image_position ? (((size - (visible - image_position)) - (image_position) ))  * parseInt(width, 10) : ((size - (visible - image_position)) - (current_object.last_position) )  * parseInt(width, 10);
        } else if ((current_object.last_position < (size - (visible - image_position))) && ((current_position >= (size - (visible - image_position))))){
          position = ((size - (visible - image_position)) - parseInt(current_object.last_position) ) * parseInt(width, 10);
        }
        return position;
      },
      image_movement : function(visible, size, current_position, width, image_position) {
        var current_object = $('#picture_content').data('jPicture_plugin');
        var position = 0;
        console.log('cur_fi' + current_object.first_click);
        if (current_position >= (size - (parseInt(visible, 10) - image_position))) {
          for(var i = 0; i <= (visible -image_position); i++) {
            if (current_position === "" + ((parseInt(size,10) - i))) {
              if (current_object.first_click === 0) {
                position = current_object.last_position == 0 ? (((parseInt(current_position, 10) -(parseInt(visible) - i)) - parseInt(current_object.last_position, 10) ) * parseInt(width, 10)) : plugin.image_move_at_last(current_position, image_position, size, visible, width);
                $("ul.image_grid li").animate({"left": '-=' + position + "px"}, "slow");
                current_object.first_click++;
              }
              //by arrow it reach last hide the next arrow
              $("#next").hide();
              //by clicking number
            }
          } 
        } else if((current_position < (size - (visible - image_position)) && current_object.last_position > (size - (visible - image_position))) && current_position > image_position) {
          current_object.first_click = 0;
          position = ((size - (visible - image_position)) - current_position) * parseInt(width, 10);
          $("ul.image_grid li").animate({"left": '+=' + position + "px"}, "slow");
        } else if(current_position < image_position && current_object.last_position > image_position ) {
          if (current_position < image_position && current_object.last_position > (size - (visible - image_position))) {
            position = ( (size - (visible - image_position)) - image_position) * parseInt(width, 10);
          } else if (current_object.last_position <= (size - (visible - image_position))){
            position = ( (parseInt (current_object.last_position, 10) - (image_position))) * parseInt(width, 10);
          }
          current_object.first_click = 0;
          current_object.last_position = current_position;
          $("ul.image_grid li").animate({"left": '+=' + position + "px"}, "slow");
        }
        else {
          current_object.first_click = 0
          position = ( ( parseInt (current_position, 10) - image_position) * parseInt(width, 10) );
          $("ul.image_grid li").animate({"left": -position + "px"}, "slow");
        }
        current_object.last_position = current_position;
      },
      show_current_position : function() {
        var current_object = $('#picture_content').data('jPicture_plugin'), position;
        position = (parseInt(current_object.current_position, 10) - current_object.constant);
        $('#scroll a:eq('+ position +')').addClass('selected');
        console.log('pos' + position);
        console.log($('.image_grid li:eq('+ position + ')').addClass('image_selected'));
      },
      remove_previous_position : function() {
        $('#scroll a').removeClass('selected');
        $('.image_grid li').removeClass('image_selected');
      },
      scroll_movement : function(current_position, size, visible, list_width, image_position) {
        var scroll_position = 0;
        var lt_width = parseInt(list_width, 10) - 1;
        var current_object = $('#picture_content').data('jPicture_plugin');
        if (current_position > (size - parseInt(visible, 10) + (image_position - current_object.constant))) {
          for(var i = 0; i <= (visible - image_position); i++) {
            if (current_position === "" + ((parseInt(size,10) - i)) || current_position === ((parseInt(size,10) - i))) {
              if (current_object.first_click_scroll === 0) {
                if(current_object.last_position == 0) {
                  scroll_position = (((parseInt(current_position, 10) - (parseInt(visible) - i)) - parseInt(current_object.last_position, 10)) * lt_width);
                } else {
                  scroll_position = current_object.last_position <= image_position ? (( (size - (visible- (image_position)))) - (image_position)) * lt_width : ((size - (visible- (image_position))) - current_object.last_position)  * lt_width;
                }
                current_object.first_click_scroll++;
              }
            }
          }
        } else if(current_object.last_position == 0 && current_position < (size - (visible - image_position))) {
          current_object.first_click_scroll = 0;
          scroll_position = (current_position - image_position) * lt_width;
        } else if(current_object.last_position < (size - (visible - image_position)) && current_position <= image_position) {
          current_object.first_click_scroll = 0;
          scroll_position = (image_position - current_object.last_position) * lt_width;
        } else if ((current_object.last_position < (size - (visible - image_position))) && (current_object.last_position < image_position)){
          current_object.first_click_scroll = 0;
          scroll_position = (current_position  - image_position) * lt_width;
        } else if ((current_object.last_position >= (size - (visible - image_position)) && (current_position <= image_position))) {
          current_object.first_click_scroll = 0;
          scroll_position = (image_position -  (size - (visible - (image_position))) ) * lt_width;
        } else if((current_object.last_position >= (size - (visible - image_position))) && (current_position > image_position)) {
          current_object.first_click_scroll = 0;
          scroll_position = (current_position - (size - (visible - image_position)) ) * lt_width;
        } else {
          current_object.first_click_scroll = 0;
          scroll_position = ( current_position - current_object.last_position) * lt_width;
        }
        // if (current_object.last_position < current_position && current_position % 5 == 0) {
        //           if (current_position > 20 ) {
        //             scroll_position += 5;
        //           }
        //           $('#active').css({'width': ((visible * (lt_width + 1)) + 5) + 'px'});
        //         } else if (current_object.last_position > current_position && current_position % 5 == 0){
        //           if (current_position < 20 ) {
        //             scroll_position -= 5;
        //           }
        //         }
        $("#scroll #active").animate({"right": '-=' + scroll_position + "px"}, "slow");
      }
    };
    $.fn.jPicture_plugin = function(options) {
      var width, image_width, current_obj;
      width = $('body').outerWidth();
      var default_settings = {
        image_width: '360px',
        image_height: 'auto',
        content_height: 'auto',
        image_position : 3,
        image_visible: 5
      };
      return this.each(function () {
        var current_object = $('#picture_content').data('jPicture_plugin'), size = 0;
        if (options) {
          $.extend(default_settings, options);
        }
        current_obj = this;
        plugin.initialize_content(current_obj);
        size = $('.image_grid li').size();
        default_settings.list_width = Math.floor(width/size);
        plugin.initialize_gird(default_settings.image_width, default_settings.image_height, current_obj, default_settings.image_visible, default_settings.content_height, size, default_settings.list_width);
        //disable the prevbutton initially if greater than the image_size
        if (default_settings.image_visible < size) {
          $("#previous").hide();
        } else {
          $("#next").hide();
          $("#previous").hide();
        }
        $("body a").live('click', function() {
          plugin.image_process(default_settings.image_position, default_settings.image_width, default_settings.image_visible, default_settings.list_width, size, this);
        });
        plugin.show_current_position();        
      });
    }
  }(jQuery));
});
