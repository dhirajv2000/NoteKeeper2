<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="src/css/styles.css">
</head>

<body>
    <h1 id="usernameHeader">Hello, <s:property value="uname" /> !!</h1>
    <span><button class="button1 button4" id='add-btn' style="margin-top: 50px;">New Note</button></span>
    <span><button class="button1 button4" id='save-btn' style="margin-top: 50px;">Save All</button></span>
    <span><button class="button1 button4" id='clear-btn' style="margin-top: 50px;">Clear All</button></span>
    <span><button class="button1 button4" id='logout-btn' style="margin-top: 50px;">Logout</button></span>
    <div class='grid'>
    </div>
    <script src="src/scripts/storagemanager.js"></script>
    <script src="src/scripts/utilityfunctions.js"></script>
    <script src="src/scripts/sessionmanager.js"></script>
    <script src="src/scripts/createnote.js"></script>
    <script src="src/scripts/noteview.js"></script>
    <script src="src/scripts/notecontrol.js"></script>
    <script src="src/scripts/main.js"></script>
</body>

</html>