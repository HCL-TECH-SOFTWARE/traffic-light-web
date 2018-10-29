/*******************************************************************************
 * (c) Copyright HCL Technologies Ltd. 2018.  MIT Licensed!
 *******************************************************************************/

/**
 * Client application entry point
 * @author Mattias Mohlin
 */

$(function () {
    var socket = io();    

    socket.on('light', function(msg) {
        $('#light-label').text("Light: " + msg.light);
        $('#rl').css('fill', 'black');
        $('#yl').css('fill', 'black');
        $('#gl').css('fill', 'black');
        if (msg.light == 'red') {
            $('#rl').css('fill', 'red');            
        }
        else if (msg.light == 'yellow') {
            $('#yl').css('fill', 'yellow');
        }
        else if (msg.light == 'green') {
            $('#gl').css('fill', 'green');
        }
    });
    
    socket.on('pedlight', function(msg) {
        $('#pedSignal').attr('src', '/images/' + msg.light);
    });

    //$('#request_data').click(function() {
    //    socket.emit('request_data');
    //});
});