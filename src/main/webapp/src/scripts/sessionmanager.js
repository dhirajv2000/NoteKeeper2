function SessionManager() {
    let self = this;
    this.fetchSessionDetails = function () {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let sessionId = JSON.parse(this.response)
                resolve(sessionId['sessionDetails']);
            };
            xhr.onerror = reject;
            xhr.open('GET', '/NoteKeeper2/getsession.action');
            xhr.send();
        });
    }

    this.intialiseSessionDetails = function () {
            sessionuser = localStorage.getItem("username");
            sessiontoken = localStorage.getItem("sessionToken");
            document.getElementById('usernameHeader').innerHTML = "Hello, " + sessionuser;
            self.loadUserContent();
    }

    this.intialiseBroadcast = function () {
        document.querySelector('#logout-btn').addEventListener('click', e => {
        	localStorage.clear();
            location.href = '/NoteKeeper2/logout.action?sessionToken='+sessiontoken;
            authChannel.postMessage({
                action: 'logout'
            });
        });

        authChannel.onmessage = function (e) {
            if (e.data.action === 'logout') {
            	localStorage.clear();
                location.href = '/NoteKeeper2/indexaction.action';
            }else if(e.data.action === 'update') {
                noteControl.setNoteArray(e.data.updatedNoteArray);
            }
        }
    }

    this.loadUserContent = function () {
        noteControl.loadNoteArray();
    }
}