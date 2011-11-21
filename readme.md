Rabble Client
=============

Adding a Rabble chat to your site is easy and only takes a moment. To get set up with the default Rabble client, simply copy and paste the code below into your the HEAD section of your web pages.

    <link rel="stylesheet" href="http://server.rabble.io/v1/rabble.client.ui.css">
    <script src="http://server.rabble.io/v1/rabble.client.api.js"></script>
    <script src="http://server.rabble.io/v1/rabble.client.ui.js"></script>

Please Note: The default Rabble client is built using the jQuery JavaScript library. If you're not already using jQuery you can include it by placing the following above the Rabble client script tags.

    <script src="http://code.jquery.com/jquery.min.js"></script>

If you're using a library other than jQuery, you can build your own custom Rabble client UI. For more information, please see our notes on customizing Rabble.

###Chatting With Rabble

Once installed, Rabble is simple to use. Simply click on the chat tab to open it. You can change your username from the default Guest name assigned to you by clicking the 'change' link next to your username in the top left of the chat window. Rabble also supports the IRC-style '/me' command for actions. That's all there is to it! 

Customizing Rabble For Your Needs
---------------------------------

Rabble's client interface is open source and customization is encouraged. For most users, simply modifying the Rabble Client CSS will be sufficient. If you'd like to dig deeper, feel free to grab the unpacked Client code and roll your own client. You can find notes on the Rabble Client API below.
The Default Client Markup & CSS

When you add Rabble to your site we'll provide you with a default CSS file for the Rabble Client. For those of you who would like to customize this CSS, below is a sample of the Rabble Client HTML markup to use as a guide.

    <div id="Rabble-wrapper">
        <div id="Rabble-toggle">
            <span>0</span> People Chatting
            <a href="#">+</a>
        </div>
        <div id="Rabble">
            <div id="Rabble-userInfo">
                Chatting as <strong></strong>. 
            </div>
            <div id="Rabble-chatWindow"></div>
            <form action="#" method="get" id="Rabble-chatInput">
                <input type="text" name="message" size="40">
            </form>
            <div id="Rabble-userCount">
                <span>0</span> people in the chat
                <a href="http://rabble.io" target="_blank">powered by <em>Rabble</em></a>
            </div>
        </div>
    </div>

###The Rabble Client API - Receiving Data

The Rabble Client API calls certain functions automatically when data is received from the server. To build your own UI, you'll need to extend the rabble object by adding these functions. You'll create several new functions to respond to Rabble server codes.

The general style used here is that any functions which directly affect the client UI are named in the form of guiDoSomething. If you wish to create additional functions within the rabble object, it's recomended that you avoide the 'gui' prefix to ease upgrading and reduce future compatability errors.

- `rabble.guiJoin(data)`: Prints the join message. Receives an object with timestamp and user properties.

- `rabble.guiPart(data)`: Prints the part message. Receives an object with timestamp and user properties.

- `rabble.guiPrintMsg(response, type)`: Prints messages relayed from the server. Receives an object with timestamp, user, type. and text properties. The type property can be either 'message', 'action', or 'global' (used for system alerts).

- `rabble.guiPrintError(error)`: Prints an error message. Receives a string containing the error text. Currently not used.

- `rabble.guiClearError()`: Clears the error message. Currently not used.

- `rabble.guiSetUserCount(data)`: Updates the count displaying the total number of users in the room. Receives an object containing a userCount property.

- `rabble.guiUpdateUsername()`: Updates the user's nickname display in the GUI. Receives a string containing the new nickname.

- `rabble.guiRender()`: Renders the Rabble Client if the 'Rabble' element is not present on the page.

###The Rabble Client API - Sending Data

To send data to the server, you will interact with the rabble object directly by binding the below functions to events such as submitting a message to the chat and submitting a nickname change.

- `rabble.sendMessage()`: Sends a message (or action) to the server. Accepts a string containing the message text. Bind to #Rabble-chatInput submit event.

- `rabble.sendRename()`: Registers a nickname change with the server. Accepts a string containing the user's new nickname.

###The Rabble Client API - Other Functions

Below are additional functions within the Rabble Client API you may wish to make use of.

- `rabble.formatTime()`: A helper function to create a human-readable, localized timestamp for incoming chat activity. Accepts a raw timestamp. 
