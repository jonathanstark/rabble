rabble.guiJoin = function(data) {
    if(data.returns > 0) {
        var output = '<span>' + rabble.formatTime(data.timestamp) + ':</span> <strong>*** ' + data.user + '</strong> is back!';
    } else {
        var output = '<span>' + rabble.formatTime(data.timestamp) + ':</span> <strong>***</strong> A new user has joined the chat. I dub thee.... <strong>' + data.user + '</strong>!';
    }
    $('#Rabble-chatWindow').append('<div>' + output + '</div>');
    document.getElementById('Rabble-chatWindow').scrollTop = document.getElementById('Rabble-chatWindow').scrollHeight;
};

rabble.guiPart = function(data) {
    var output = '<span>' + rabble.formatTime(data.timestamp)+ ':</span> <strong>*** ' + data.user + '</strong> has left the chat.';
    $('#Rabble-chatWindow').append('<div>' + output + '</div>');
    document.getElementById('Rabble-chatWindow').scrollTop = document.getElementById('Rabble-chatWindow').scrollHeight;
};

rabble.guiPrintMsg = function(response, type) {
    if(type=='message') {
        var output = '<span>' + rabble.formatTime(response.timestamp) + ':</span> <strong>' + response.user + ':</strong> ' + response.text + '';
    } else if(type=='action') {
        var output = '<span>' + rabble.formatTime(response.timestamp) + ':</span> <strong>* ' + response.user + '</strong> ' + response.text + '';
    } else if(type=='global') {
        var output = '<span>' + rabble.formatTime(response.timestamp) + ':</span> <strong style="color:#a00">*** ' + response.text + ' ***</strong>';
    }
    $('#Rabble-chatWindow').append('<div>' + output + '</div>');
    document.getElementById('Rabble-chatWindow').scrollTop = document.getElementById('Rabble-chatWindow').scrollHeight;

    if($('#Rabble').css('display') == 'none') {
        $('#Rabble-toggle').addClass('highlight');
    }
};

rabble.guiSetUserCount = function(data) {
    $('#Rabble-userCount span').text(data.activeUsers + ' of ' + data.totalUsers);
    $('#Rabble-toggle span').text(data.activeUsers + ' of ' + data.totalUsers);
};

rabble.guiUpdateUsername = function(user) {
    $('#Rabble-userInfo strong').text(user);
};

rabble.guiRender = function() {
    rabble.returns = 0;
    if($('#Rabble').length == 0) {
        var rabbleUI = $('<div>').attr('id', 'Rabble-wrapper');
        var chatToggle = $('<div>').attr('id', 'Rabble-toggle').html('<div><span>0</span> People Chatting</div><a href="#">+</a>');
        var chatGUI = $('<div>').attr('id', 'Rabble').html(
            '<div id="Rabble-userInfo">Chatting as <strong></strong>.</div>'+
            '<div id="Rabble-chatWindow"></div>' +
            '<form action="#" method="get" id="Rabble-chatInput">' +
            '    <input type="text" name="message" size="40">' +
            '</form>' +
            '<div id="Rabble-userCount">' +
            '    <span>0</span> people in the chat' +
            '    <a href="http://rabblejs.com" target="_blank">powered by <em>Rabble</em></a>' +
            '</div>'
        );
        rabbleUI.append(chatToggle).append(chatGUI);
        $('body').append(rabbleUI);
        $('#Rabble').css('top', ($('#Rabble').outerHeight()+15)*-1);
    }
};

$(function() {
    $('body').delegate('#Rabble-chatInput', 'submit', function(e) {
        e.preventDefault();
        var msgBox = $('input[type=text]', this);
        var message = msgBox.val().trim();
        if(message != '') {
            rabble.sendMessage(message);
            msgBox.val('').focus();
        }
    }).delegate('#Rabble-toggle a', 'click', function(e) {
        e.preventDefault();
        var elem = $(this);
        var rbbl = $('#Rabble');

        elem.parent().removeClass('highlight');

        if(rbbl.css('display') == 'none') {
            rbbl.css('display', 'block');
            elem.text('-');
            rabble.sendStatus('active');
            rabble.returns++;
        } else {
            rbbl.css('display', 'none');
            elem.text('+');
            rabble.sendStatus('inactive');
        }
    });
});
