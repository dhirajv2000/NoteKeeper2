//Manages session state
function SessionManager() {
    let self = this;
    
    //Loads user content
    this.intialiseSessionDetails = function () {
        let sessionuser = localStorage.getItem("username");
        document.getElementById('usernameHeader').innerHTML = "Hello, " + sessionuser;
        self.loadUserContent();
    }
    
    //Broadcasts logout to all tabs
    this.intialiseBroadcast = function () {
        document.querySelector('#logout-btn').addEventListener('click', e => {
        	let sessiontoken = localStorage.getItem("sessionToken");
            localStorage.clear();
            location.href = '/NoteKeeper2/logout.action?sessionToken=' + sessiontoken;
            authChannel.postMessage({
                action: 'logout'
            });
        });

        authChannel.onmessage = function (e) {
            if (e.data.action === 'logout') {
                localStorage.clear();
                location.href = '/NoteKeeper2/login.html';
            } else if (e.data.action === 'update') {
                noteControl.setNoteArray(e.data.updatedNoteArray);
            }
        }
    }

    this.loadUserContent = function () {
        noteControl.loadNoteArray();
    }
}