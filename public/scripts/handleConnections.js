
function addFuctionToButtons(className, functionName) {
    const buttons = document.getElementsByClassName(className);
    console.log(buttons);
    for(let i=0;i<buttons.length;i++) {
        buttons[i].addEventListener("click",function(e){
            functionName(e);
        });
    }
}

addFuctionToButtons("connect-btn",updateConnections);
addFuctionToButtons("pending-btn",reactToConnectionRequest);
addFuctionToButtons("accept-btn",reactToConnectionRequest);
addFuctionToButtons("ignore-btn",reactToConnectionRequest);

async function updateConnections(e) {
    
    const userToConnect = e.target.name;
    console.log(userToConnect);
    const connectionReq = {
        userToConnect: userToConnect,
    };

    document.getElementsByName(userToConnect)[0].innerHTML = "Pending";

    console.log(connectionReq);

    try {
        const response = await fetch('http://localhost:3000/update/connection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(connectionReq),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function reactToConnectionRequest(e) {
    const reqConnection = {
        connection_id: e.target.name
    };
    console.log(reqConnection);
    try {
        const response = await fetch("http://localhost:3000/reactToRequest",{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(reqConnection)
        });

        if(!response.ok) {
            console.log(response.Error);
        }

    } catch (error) {
        console.log("ERROR OCCURED WHILE PERFORMING THE ACTION: "+error);
    }
}