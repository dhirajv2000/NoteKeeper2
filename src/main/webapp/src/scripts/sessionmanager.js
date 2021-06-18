function SessionManager() {
    let self = this;
    this.fetchSessionDetails = function () {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                let sessionId = JSON.parse(this.response)
                resolve(sessionId['sessionDetails']);
                //resolve( sessionId['sessionId']);
            };
            xhr.onerror = reject;
            xhr.open('GET', '/NoteKeeper2/getsession.action');
            xhr.send();
        });
    }

    this.intialiseSessionDetails = function () {
        self.fetchSessionDetails().then(function (response) {
            sessionid = response[0];
            sessionuser = response[1];
            //localStorage.setItem('sessionid', sessionid)
            document.getElementById('usernameHeader').innerHTML = "Hello, " + sessionuser;
            self.loadUserContent();
        })
    }

    this.intialiseBroadcast = function () {
        document.querySelector('#logout-btn').addEventListener('click', e => {
            location.href = '/NoteKeeper2/logout.action'
            authChannel.postMessage({
                action: 'logout'
            });
        });

        authChannel.onmessage = function (e) {
            if (e.data.action === 'logout') {
                location.href = '/NoteKeeper2/logout.action'
            }
        }
    }

    this.loadUserContent = function () {
        noteControl.getNoteArray();
    }
}