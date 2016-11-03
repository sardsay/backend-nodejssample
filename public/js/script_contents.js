var selCategory = function() {
    if ($('#selcategory').val() != '') {
        $.post("/research-contents/subcategoryByCateID",
        {
            cateid: $('#selcategory').val(),
            _csrf : $('#_csrf').val()
        }, function (datasub) {
            var text = '<option value="">Choose SubCategory</option>';
            for (var i = 0; i < datasub.length; i++) {
                text += '<option value="'+datasub[i]._id+'">'+ datasub[i].subCategoryName + '</option>';
            }
            $('#selsubcategory').html(text)
            
        });
        for (var i = 1; i <= 10; i++) {
                
            $('#template'+i).hide();
                
        }
    }
            
            
}
var setTheme = function(){
    var subcateid = $('#selsubcategory').val();
    // $scope.content.template = subCateTheme[subcateid];
    // $scope.theme_id = subCateTheme[subcateid];
    for (var i = 1; i <= 10; i++) {
        if (i == $scope.content.template) {
            $('#template'+i).show();
        }else{
            $('#template'+i).hide();
        }
    }
            
}

$(function () {

    
    $('#datePublished1').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished2').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished3').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished4').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished5').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished6').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished7').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished8').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished9').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    $('#datePublished10').datetimepicker({
        format:'Y-m-d H:i',
        allowTimes:[
            '08:00', '09:00', '10:00',
            '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', 
            '17:00', '18:00', '19:00', '20:00'
        ]
    });
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                    checkboxClass: 'icheckbox_flat-green',
                    radioClass: 'iradio_flat-green'
                });
        });
    }
        $('.En-tabb').on('click',function(){
            $('.tab_contentEN').addClass('active in');
            $('.tab_contentTH').removeClass('active in');
        })
        $('.Th-tabb').on('click',function(){
            $('.tab_contentTH').addClass('active in');
            $('.tab_contentEN').removeClass('active in');
        })
        function initToolbarBootstrapBindings() {
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                'Times New Roman', 'Verdana'
              ],
              fontTarget = $('[title=Font]').siblings('.dropdown-menu');
            $.each(fonts, function(idx, fontName) {
              fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
            });
            $('a[title]').tooltip({
              container: 'body'
            });
            $('.dropdown-menu input').click(function() {
                return false;
              })
              .change(function() {
                $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
              })
              .keydown('esc', function() {
                this.value = '';
                $(this).change();
              });

            $('[data-role=magic-overlay]').each(function() {
              var overlay = $(this),
                target = $(overlay.data('target'));
              overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
            });
            /*if ("onwebkitspeechchange" in document.createElement("input")) {
              var editorOffset = $('#editor').offset();
              $('#voiceBtn').css('position', 'absolute').offset({
                top: editorOffset.top,
                left: editorOffset.left + $('#editor').innerWidth() - 35
              });
            } else {
              $('#voiceBtn').hide();
            }*/
        };
        function showErrorAlert(reason, detail) {
            var msg = '';
            if (reason === 'unsupported-file-type') {
              msg = "Unsupported format " + detail;
            } else {
              console.log("error uploading file", reason, detail);
            }
            $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
              '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
        };
        initToolbarBootstrapBindings();
        $('#editor1').wysiwyg({
            fileUploadError: showErrorAlert,
            toolbarSelector: '[data-role=editor1-toolbar]'
        });
        $('#editor2').wysiwyg({
            fileUploadError: showErrorAlert,
            toolbarSelector: '[data-role=editor2-toolbar]'
        });
        $('#editor3').wysiwyg({
            fileUploadError: showErrorAlert,
            toolbarSelector: '[data-role=editor3-toolbar]'
        });
});